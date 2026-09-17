from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from uuid import UUID

from domain.enums import MeetingStatus

class MeetingSchedule(BaseModel):
    lead_id: UUID
    scheduled_at: datetime
    provider: str = "ZOOM"
    duration: int = 30
    timezone: str = "America/Argentina/Buenos_Aires"
    notes: Optional[str] = None

class MeetingResponse(BaseModel):
    id: UUID
    lead_id: UUID
    provider: str
    external_id: Optional[str] = None
    scheduled_at: datetime
    duration: int
    timezone: str
    meeting_url: Optional[str] = None
    status: MeetingStatus
    notes: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True
