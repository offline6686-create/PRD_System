from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime
from uuid import UUID

class AutomationRuleCreate(BaseModel):
    name: str
    trigger_event: str
    conditions: List[Dict[str, Any]] = []
    actions: List[Dict[str, Any]] = []
    is_active: bool = True

class EventPayload(BaseModel):
    event_type: str
    lead_id: UUID
    metadata: Dict[str, Any] = {}
    timestamp: datetime = datetime.utcnow()
