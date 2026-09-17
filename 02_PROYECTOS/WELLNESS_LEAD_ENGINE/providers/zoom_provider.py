from typing import Dict, Any
from datetime import datetime
import uuid

from .base import BaseMeetingProvider

class MockZoomProvider(BaseMeetingProvider):
    def create_meeting(self, lead_id: str, scheduled_at: str, duration: int = 30) -> Dict[str, Any]:
        meeting_id = f"zoom_mock_{uuid.uuid4().hex[:10]}"
        join_url = f"https://us02web.zoom.us/j/mock_{uuid.uuid4().hex[:9]}"
        return {
            "status": "SCHEDULED",
            "external_id": meeting_id,
            "scheduled_at": scheduled_at,
            "duration": duration,
            "meeting_url": join_url,
            "provider": "MOCK_ZOOM",
            "mock": True
        }

    def get_meeting_status(self, meeting_id: str) -> Dict[str, Any]:
        return {
            "external_id": meeting_id,
            "status": "COMPLETED",
            "provider": "MOCK_ZOOM"
        }
