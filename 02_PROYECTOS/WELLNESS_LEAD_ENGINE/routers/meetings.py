from fastapi import APIRouter, status
from typing import List
from uuid import uuid4
from datetime import datetime

from schemas.meeting import MeetingSchedule, MeetingResponse
from domain.enums import MeetingStatus
from providers.zoom_provider import MockZoomProvider

router = APIRouter(prefix="/api/wellness/meetings", tags=["Meetings"])
zoom_provider = MockZoomProvider()

_in_memory_meetings: List[MeetingResponse] = []

@router.post("/", response_model=MeetingResponse, status_code=status.HTTP_201_CREATED)
def schedule_meeting(payload: MeetingSchedule):
    zoom_res = zoom_provider.create_meeting(
        lead_id=str(payload.lead_id),
        scheduled_at=payload.scheduled_at.isoformat(),
        duration=payload.duration
    )
    m = MeetingResponse(
        id=uuid4(),
        lead_id=payload.lead_id,
        provider=payload.provider,
        external_id=zoom_res["external_id"],
        scheduled_at=payload.scheduled_at,
        duration=payload.duration,
        timezone=payload.timezone,
        meeting_url=zoom_res["meeting_url"],
        status=MeetingStatus.SCHEDULED,
        notes=payload.notes,
        created_at=datetime.utcnow()
    )
    _in_memory_meetings.append(m)
    return m

@router.get("/", response_model=List[MeetingResponse])
def list_meetings():
    return _in_memory_meetings
