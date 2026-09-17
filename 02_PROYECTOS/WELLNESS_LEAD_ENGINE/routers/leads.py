from fastapi import APIRouter, HTTPException, Query, Status
from typing import List, Optional
from uuid import UUID

from schemas.lead import LeadCreate, LeadUpdate, LeadResponse, DuplicateCheckResponse
from services.lead_service import LeadService

router = APIRouter(prefix="/api/wellness/leads", tags=["Leads"])
lead_service = LeadService()

@router.post("/", response_model=LeadResponse, status_code=Status.HTTP_201_CREATED)
def create_lead(payload: LeadCreate):
    return lead_service.create_lead(payload)

@router.get("/", response_model=List[LeadResponse])
def list_leads(
    status: Optional[str] = None,
    city: Optional[str] = None,
    page: int = Query(1, ge=1),
    page_size: int = Query(50, ge=1, le=200)
):
    return lead_service.list_leads(status=status, city=city, page=page, page_size=page_size)

@router.get("/{lead_id}", response_model=LeadResponse)
def get_lead(lead_id: UUID):
    lead = lead_service.get_lead(lead_id)
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found.")
    return lead

@router.patch("/{lead_id}", response_model=LeadResponse)
def update_lead(lead_id: UUID, payload: LeadUpdate):
    updated = lead_service.update_lead(lead_id, payload)
    if not updated:
        raise HTTPException(status_code=404, detail="Lead not found.")
    return updated

@router.post("/check-duplicate", response_model=DuplicateCheckResponse)
def check_duplicate(first_name: str, email: Optional[str] = None, whatsapp: Optional[str] = None, phone: Optional[str] = None, last_name: Optional[str] = None):
    res = lead_service.check_duplicate(email=email, whatsapp=whatsapp, phone=phone, first_name=first_name, last_name=last_name)
    return DuplicateCheckResponse(**res)
