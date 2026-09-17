import unittest
from uuid import uuid4
from services.automation_engine import AutomationEngine
from schemas.automation import EventPayload
from domain.enums import AutomationEvent

class TestAutomationEngine(unittest.TestCase):
    def test_automation_event_dispatch(self):
        engine = AutomationEngine()
        lead_id = uuid4()

        payload = EventPayload(
            event_type=AutomationEvent.LEAD_CREATED.value,
            lead_id=lead_id
        )

        log = engine.dispatch_event(payload)
        self.assertEqual(log["status"], "SUCCESS")
        self.assertGreaterEqual(len(log["actions_executed"]), 2)
        self.assertEqual(log["actions_executed"][0]["action"], "CREATE_FOLLOW_UP")

if __name__ == "__main__":
    unittest.main()
