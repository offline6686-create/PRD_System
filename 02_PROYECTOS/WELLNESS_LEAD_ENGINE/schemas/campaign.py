from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from uuid import UUID

from domain.enums import Platform

class CampaignCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)
    platform: Platform
    description: Optional[str] = None
    objective: Optional[str] = None
    status: str = "ACTIVE"
    budget: float = 0.0
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    utm_source: Optional[str] = None
    utm_medium: Optional[str] = None
    utm_campaign: Optional[str] = None
    utm_content: Optional[str] = None
    utm_term: Optional[str] = None

class CampaignResponse(BaseModel):
    id: UUID
    name: str
    platform: Platform
    description: Optional[str] = None
    objective: Optional[str] = None
    status: str
    budget: float
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    utm_source: Optional[str] = None
    utm_medium: Optional[str] = None
    utm_campaign: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True
