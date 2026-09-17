from fastapi import APIRouter, Header, HTTPException, Status
from typing import Dict, Any, Optional
from uuid import UUID

from schemas.lead import LeadCreate, LeadResponse
from services.lead_service import LeadService
from services.automation_engine import AutomationEngine
from schemas.automation import EventPayload
from domain.enums import Source, Interest, LeadObjective

router = APIRouter(prefix="/api/webhooks", tags=["Integrations & Webhooks"])
lead_service = LeadService()
automation_engine = AutomationEngine()

@router.post("/leads", response_model=LeadResponse, status_code=Status.HTTP_201_CREATED)
def receive_external_lead_webhook(
    payload: Dict[str, Any],
    x_webhook_signature: Optional[str] = Header(None)
):
    """
    Universal Webhook Endpoint for Meta Ads, Google Ads, Landing pages, CSV imports.
    Idempotent creation, duplicate checking, and auto-triggering LEAD_CREATED event.
    """
    first_name = payload.get("first_name") or payload.get("nombre") or "Lead"
    last_name = payload.get("last_name") or payload.get("apellido")
    email = payload.get("email")
    phone = payload.get("phone") or payload.get("telefono")
    whatsapp = payload.get("whatsapp") or phone
    city = payload.get("city") or payload.get("ciudad") or "Olavarría"
    province = payload.get("province") or payload.get("provincia") or "Buenos Aires"
    country = payload.get("country") or payload.get("pais") or "Argentina"
    raw_source = payload.get("source", "META_ADS").upper()

    try:
        source_enum = Source[raw_source]
    except KeyError:
        source_enum = Source.META_ADS

    lead_input = LeadCreate(
        first_name=first_name,
        last_name=last_name,
        email=email,
        phone=phone,
        whatsapp=whatsapp,
        country=country,
        province=province,
        city=city,
        source=source_enum,
        source_detail=payload.get("ad_id") or payload.get("utm_campaign"),
        interest=Interest.HEALTHY_HABITS,
        objective=LeadObjective.HABITS,
        consent_given=True
    )

    lead = lead_service.create_lead(lead_input)

    # Dispatch automated LEAD_CREATED event
    automation_engine.dispatch_event(EventPayload(
        event_type="LEAD_CREATED",
        lead_id=lead.id,
        metadata={"source": source_enum.value}
    ))

    return lead
