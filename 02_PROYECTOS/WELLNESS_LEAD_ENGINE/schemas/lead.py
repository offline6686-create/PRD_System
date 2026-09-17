from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List, Dict, Any
from datetime import datetime
from uuid import UUID

from domain.enums import LeadStatus, Interest, LeadObjective, Source

class LeadCreate(BaseModel):
    first_name: str = Field(..., min_length=1, max_length=100)
    last_name: Optional[str] = Field(None, max_length=100)
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    whatsapp: Optional[str] = None
    country: Optional[str] = "Argentina"
    province: Optional[str] = "Buenos Aires"
    city: Optional[str] = "Olavarría"
    postal_code: Optional[str] = None
    timezone: Optional[str] = "America/Argentina/Buenos_Aires"
    source: Source = Source.MANUAL
    source_detail: Optional[str] = None
    campaign_id: Optional[UUID] = None
    landing_page_id: Optional[UUID] = None
    form_id: Optional[UUID] = None
    interest: Interest = Interest.HEALTHY_HABITS
    objective: Optional[LeadObjective] = LeadObjective.HABITS
    notes: Optional[str] = None
    consent_given: bool = True

class LeadUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    whatsapp: Optional[str] = None
    status: Optional[LeadStatus] = None
    lead_score: Optional[int] = None
    assigned_distributor_id: Optional[UUID] = None
    next_follow_up_at: Optional[datetime] = None
    notes: Optional[str] = None

class LeadResponse(BaseModel):
    id: UUID
    first_name: str
    last_name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    whatsapp: Optional[str] = None
    country: Optional[str] = None
    province: Optional[str] = None
    city: Optional[str] = None
    postal_code: Optional[str] = None
    timezone: Optional[str] = None
    source: Source
    source_detail: Optional[str] = None
    campaign_id: Optional[UUID] = None
    interest: Interest
    objective: Optional[LeadObjective] = None
    status: LeadStatus
    lead_score: int
    assigned_distributor_id: Optional[UUID] = None
    consent_given: bool
    privacy_accepted_at: Optional[datetime] = None
    last_contact_at: Optional[datetime] = None
    next_follow_up_at: Optional[datetime] = None
    converted_at: Optional[datetime] = None
    notes: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class LeadFilter(BaseModel):
    status: Optional[LeadStatus] = None
    source: Optional[Source] = None
    interest: Optional[Interest] = None
    country: Optional[str] = None
    province: Optional[str] = None
    city: Optional[str] = None
    campaign_id: Optional[UUID] = None
    search: Optional[str] = None
    page: int = 1
    page_size: int = 50

class DuplicateCheckResponse(BaseModel):
    is_duplicate: bool
    match_type: Optional[str] = None
    existing_lead_id: Optional[UUID] = None
    message: str
