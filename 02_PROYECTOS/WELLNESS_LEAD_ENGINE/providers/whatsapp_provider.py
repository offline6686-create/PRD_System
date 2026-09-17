from typing import Dict, Any, List
from datetime import datetime
import uuid

from .base import BaseMessagingProvider

class MockWhatsAppProvider(BaseMessagingProvider):
    """
    Mock WhatsApp Provider.
    IMPORTANT: Ensures NO real external API requests are sent when credentials are missing.
    """
    def __init__(self, is_mock: bool = True):
        self.is_mock = is_mock
        self.mock_store: List[Dict[str, Any]] = []

    def send_message(self, recipient: str, message: str) -> Dict[str, Any]:
        msg_id = f"wamid_mock_{uuid.uuid4().hex[:12]}"
        record = {
            "external_id": msg_id,
            "recipient": recipient,
            "message": message,
            "direction": "OUTBOUND",
            "status": "SENT",
            "timestamp": datetime.utcnow().isoformat(),
            "provider": "MOCK_WHATSAPP"
        }
        self.mock_store.append(record)
        return {
            "status": "success",
            "message_id": msg_id,
            "provider": "MOCK_WHATSAPP",
            "mock": True
        }

    def get_conversation_history(self, lead_id: str) -> List[Dict[str, Any]]:
        return [
            msg for msg in self.mock_store if msg.get("metadata", {}).get("lead_id") == lead_id
        ]
