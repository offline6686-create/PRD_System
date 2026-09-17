from dataclasses import dataclass, field
from datetime import datetime
from typing import Optional, List, Dict, Any
from uuid import UUID, uuid4

from .enums import (
    LeadStatus, Interest, LeadObjective, Source, Platform,
    InteractionType, MeetingStatus, FollowUpStatus, UserRole
)

@dataclass
class Location:
    id: UUID
    country: str
    province_state: str
    city: str
    postal_code: Optional[str] = None
    timezone: str = "UTC"
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

@dataclass
class Campaign:
    id: UUID
    name: str
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
    created_at: Optional[datetime] = None

@dataclass
class Lead:
    id: UUID
    first_name: str
    source: Source
    interest: Interest
    last_name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    whatsapp: Optional[str] = None
    location_id: Optional[UUID] = None
    country: Optional[str] = None
    province: Optional[str] = None
    city: Optional[str] = None
    postal_code: Optional[str] = None
    timezone: str = "UTC"
    source_detail: Optional[str] = None
    campaign_id: Optional[UUID] = None
    landing_page_id: Optional[UUID] = None
    form_id: Optional[UUID] = None
    objective: Optional[LeadObjective] = None
    status: LeadStatus = LeadStatus.NEW
    lead_score: int = 10
    assigned_distributor_id: Optional[UUID] = None
    consent_given: bool = True
    privacy_accepted_at: Optional[datetime] = None
    last_contact_at: Optional[datetime] = None
    next_follow_up_at: Optional[datetime] = None
    converted_at: Optional[datetime] = None
    notes: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

@dataclass
class LeadDuplicate:
    id: UUID
    lead_id: UUID
    duplicate_of_lead_id: UUID
    match_type: str
    status: str = "POSSIBLE_DUPLICATE"
    detected_at: Optional[datetime] = None

@dataclass
class Interaction:
    id: UUID
    lead_id: UUID
    type: InteractionType
    content: str
    direction: str = "OUTBOUND"
    metadata: Dict[str, Any] = field(default_factory=dict)
    external_id: Optional[str] = None
    created_at: Optional[datetime] = None

@dataclass
class Meeting:
    id: UUID
    lead_id: UUID
    scheduled_at: datetime
    provider: str = "ZOOM"
    external_id: Optional[str] = None
    duration: int = 30
    timezone: str = "UTC"
    meeting_url: Optional[str] = None
    status: MeetingStatus = MeetingStatus.SCHEDULED
    notes: Optional[str] = None
    created_at: Optional[datetime] = None

@dataclass
class FollowUp:
    id: UUID
    lead_id: UUID
    scheduled_at: datetime
    type: str = "GENERAL"
    status: FollowUpStatus = FollowUpStatus.PENDING
    notes: Optional[str] = None
    completed_at: Optional[datetime] = None
    created_at: Optional[datetime] = None

@dataclass
class AutomationRule:
    id: UUID
    name: str
    trigger_event: str
    conditions: List[Dict[str, Any]] = field(default_factory=list)
    actions: List[Dict[str, Any]] = field(default_factory=list)
    is_active: bool = True
    created_at: Optional[datetime] = None

@dataclass
class AcademyItem:
    id: UUID
    title: str
    category: str
    content_type: str
    file_url: Optional[str] = None
    description: Optional[str] = None
    target_role: UserRole = UserRole.ALL
    created_at: Optional[datetime] = None
