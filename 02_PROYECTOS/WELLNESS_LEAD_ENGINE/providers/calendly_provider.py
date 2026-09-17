from typing import Dict, Any, List
from datetime import datetime, timedelta
import uuid

from .base import BaseCalendarProvider

class MockCalendlyProvider(BaseCalendarProvider):
    def get_available_slots(self, date_from: str, date_to: str) -> List[Dict[str, Any]]:
        now = datetime.utcnow()
        return [
            {
                "slot_id": f"slot_{i}",
                "start_time": (now + timedelta(days=i, hours=10)).isoformat(),
                "end_time": (now + timedelta(days=i, hours=10, minutes=30)).isoformat(),
                "provider": "MOCK_CALENDLY"
            }
            for i in range(1, 4)
        ]
