from typing import Dict, Any, List, Optional
from datetime import datetime
from uuid import UUID, uuid4

from domain.models import Lead, LeadDuplicate, Interaction
from domain.enums import LeadStatus, Interest, LeadObjective, Source, InteractionType
from schemas.lead import LeadCreate, LeadUpdate

class LeadService:
    def __init__(self):
        self._in_memory_leads: Dict[UUID, Lead] = {}
        self._in_memory_duplicates: List[LeadDuplicate] = []
        self._in_memory_interactions: List[Interaction] = []

    def check_duplicate(self, email: Optional[str], whatsapp: Optional[str], phone: Optional[str], first_name: str, last_name: Optional[str]) -> Dict[str, Any]:
        for existing in self._in_memory_leads.values():
            if email and existing.email and email.lower().strip() == existing.email.lower().strip():
                return {
                    "is_duplicate": True,
                    "match_type": "EMAIL_EXACT",
                    "existing_lead_id": existing.id,
                    "message": "Exact match found on email address."
                }
            if whatsapp and existing.whatsapp and whatsapp.strip() == existing.whatsapp.strip():
                return {
                    "is_duplicate": True,
                    "match_type": "WHATSAPP_EXACT",
                    "existing_lead_id": existing.id,
                    "message": "Exact match found on WhatsApp number."
                }
            if phone and existing.phone and phone.strip() == existing.phone.strip():
                return {
                    "is_duplicate": True,
                    "match_type": "PHONE_EXACT",
                    "existing_lead_id": existing.id,
                    "message": "Exact match found on phone number."
                }
            if last_name and existing.last_name and phone and existing.phone:
                if (first_name.lower() == existing.first_name.lower() and 
                    last_name.lower() == existing.last_name.lower() and 
                    phone.strip() == existing.phone.strip()):
                    return {
                        "is_duplicate": True,
                        "match_type": "NAME_PHONE_COMBINATION",
                        "existing_lead_id": existing.id,
                        "message": "Possible duplicate based on Name + Phone combination."
                    }
        return {"is_duplicate": False, "match_type": None, "existing_lead_id": None, "message": "No duplicate detected."}

    def calculate_lead_score(self, lead_data: LeadCreate) -> int:
        score = 10 # Base score
        if lead_data.email:
            score += 15
        if lead_data.whatsapp or lead_data.phone:
            score += 25
        if lead_data.interest == Interest.BUSINESS_OPPORTUNITY:
            score += 30
        elif lead_data.interest in (Interest.HEALTHY_HABITS, Interest.WELLNESS):
            score += 20
        if lead_data.objective:
            score += 10
        return score

    def create_lead(self, payload: LeadCreate) -> Lead:
        dup_info = self.check_duplicate(
            email=payload.email,
            whatsapp=payload.whatsapp,
            phone=payload.phone,
            first_name=payload.first_name,
            last_name=payload.last_name
        )

        lead_id = uuid4()
        score = self.calculate_lead_score(payload)
        now = datetime.utcnow()

        lead = Lead(
            id=lead_id,
            first_name=payload.first_name,
            last_name=payload.last_name,
            email=payload.email,
            phone=payload.phone,
            whatsapp=payload.whatsapp,
            country=payload.country,
            province=payload.province,
            city=payload.city,
            postal_code=payload.postal_code,
            timezone=payload.timezone or "UTC",
            source=payload.source,
            source_detail=payload.source_detail,
            campaign_id=payload.campaign_id,
            landing_page_id=payload.landing_page_id,
            form_id=payload.form_id,
            interest=payload.interest,
            objective=payload.objective,
            status=LeadStatus.NEW,
            lead_score=score,
            consent_given=payload.consent_given,
            privacy_accepted_at=now,
            created_at=now,
            updated_at=now,
            notes=payload.notes
        )
        self._in_memory_leads[lead_id] = lead

        # Log creation interaction
        interaction = Interaction(
            id=uuid4(),
            lead_id=lead_id,
            type=InteractionType.FORM_SUBMISSION if payload.landing_page_id else InteractionType.SYSTEM,
            direction="INBOUND",
            content=f"Lead registered from source {payload.source.value} in {payload.city}, {payload.province}.",
            metadata={"source": payload.source.value, "score": score},
            created_at=now
        )
        self._in_memory_interactions.append(interaction)

        # Record duplicate alert if applicable
        if dup_info["is_duplicate"]:
            dup_record = LeadDuplicate(
                id=uuid4(),
                lead_id=lead_id,
                duplicate_of_lead_id=dup_info["existing_lead_id"],
                match_type=dup_info["match_type"],
                status="POSSIBLE_DUPLICATE",
                detected_at=now
            )
            self._in_memory_duplicates.append(dup_record)

        return lead

    def get_lead(self, lead_id: UUID) -> Optional[Lead]:
        return self._in_memory_leads.get(lead_id)

    def list_leads(self, status: Optional[LeadStatus] = None, city: Optional[str] = None, page: int = 1, page_size: int = 50) -> List[Lead]:
        leads = list(self._in_memory_leads.values())
        if status:
            leads = [l for l in leads if l.status == status]
        if city:
            leads = [l for l in leads if l.city and l.city.lower() == city.lower()]
        
        leads.sort(key=lambda x: x.created_at or datetime.min, reverse=True)
        start = (page - 1) * page_size
        return leads[start:start + page_size]

    def update_lead(self, lead_id: UUID, update_data: LeadUpdate) -> Optional[Lead]:
        lead = self.get_lead(lead_id)
        if not lead:
            return None
        
        now = datetime.utcnow()
        if update_data.status and update_data.status != lead.status:
            old_status = lead.status
            lead.status = update_data.status
            if update_data.status == LeadStatus.CONVERTED:
                lead.converted_at = now
            
            # Log status change interaction
            self._in_memory_interactions.append(Interaction(
                id=uuid4(),
                lead_id=lead_id,
                type=InteractionType.STATUS_CHANGE,
                direction="SYSTEM",
                content=f"Status changed from {old_status.value} to {update_data.status.value}",
                created_at=now
            ))
        
        if update_data.lead_score is not None:
            lead.lead_score = update_data.lead_score
        if update_data.notes:
            lead.notes = f"{lead.notes or ''}\n[{now.isoformat()}] {update_data.notes}"
        if update_data.next_follow_up_at:
            lead.next_follow_up_at = update_data.next_follow_up_at
        if update_data.assigned_distributor_id:
            lead.assigned_distributor_id = update_data.assigned_distributor_id

        lead.updated_at = now
        return lead
