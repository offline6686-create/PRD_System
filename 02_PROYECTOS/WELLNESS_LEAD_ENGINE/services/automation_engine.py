from typing import Dict, Any, List, Optional
from datetime import datetime, timedelta
from uuid import UUID, uuid4

from domain.enums import AutomationEvent
from schemas.automation import EventPayload

class AutomationEngine:
    """
    Event-driven Automation Engine.
    Processes triggers: EVENT -> CONDITION -> ACTION
    Maintains full execution logs and audit trails.
    """
    def __init__(self):
        self._execution_logs: List[Dict[str, Any]] = []

    def dispatch_event(self, payload: EventPayload) -> Dict[str, Any]:
        event_type = payload.event_type
        lead_id = str(payload.lead_id)
        now = datetime.utcnow().isoformat()

        actions_taken = []
        if event_type == AutomationEvent.LEAD_CREATED.value:
            # Action 1: Create Day 1 Welcome Follow-up task
            actions_taken.append({
                "action": "CREATE_FOLLOW_UP",
                "type": "DAY_1_WELCOME",
                "scheduled_at": (datetime.utcnow() + timedelta(days=1)).isoformat()
            })
            # Action 2: Trigger WhatsApp Mock Welcome Message
            actions_taken.append({
                "action": "SEND_WHATSAPP_MOCK",
                "template": "welcome_healthy_habits",
                "status": "QUEUED"
            })
        elif event_type == AutomationEvent.MEETING_COMPLETED.value:
            # Action: Create Follow-up for proposal / program review
            actions_taken.append({
                "action": "CREATE_FOLLOW_UP",
                "type": "PROGRAM_REVIEW",
                "scheduled_at": (datetime.utcnow() + timedelta(days=2)).isoformat()
            })
        elif event_type == AutomationEvent.NO_SHOW.value:
            # Action: Reschedule invitation follow-up
            actions_taken.append({
                "action": "CREATE_FOLLOW_UP",
                "type": "ZOOM_RESCHEDULE_INVITE",
                "scheduled_at": (datetime.utcnow() + timedelta(hours=24)).isoformat()
            })

        log_entry = {
            "log_id": str(uuid4()),
            "event_type": event_type,
            "lead_id": lead_id,
            "status": "SUCCESS",
            "actions_executed": actions_taken,
            "executed_at": now
        }
        self._execution_logs.append(log_entry)

        return log_entry

    def get_logs(self, limit: int = 50) -> List[Dict[str, Any]]:
        return sorted(self._execution_logs, key=lambda x: x["executed_at"], reverse=True)[:limit]
