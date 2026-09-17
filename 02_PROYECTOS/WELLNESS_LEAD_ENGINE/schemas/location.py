from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from uuid import UUID

class LocationCreate(BaseModel):
    country: str = Field(..., min_length=2, max_length=100)
    province_state: str = Field(..., min_length=2, max_length=100)
    city: str = Field(..., min_length=2, max_length=100)
    postal_code: Optional[str] = None
    timezone: str = "UTC"

class LocationResponse(BaseModel):
    id: UUID
    country: str
    province_state: str
    city: str
    postal_code: Optional[str] = None
    timezone: str
    created_at: datetime

    class Config:
        from_attributes = True
