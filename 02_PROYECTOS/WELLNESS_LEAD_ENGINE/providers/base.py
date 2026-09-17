from abc import ABC, abstractmethod
from typing import Dict, Any, Optional, List

class BaseMessagingProvider(ABC):
    @abstractmethod
    def send_message(self, recipient: str, message: str) -> Dict[str, Any]:
        pass

    @abstractmethod
    def get_conversation_history(self, lead_id: str) -> List[Dict[str, Any]]:
        pass

class BaseCalendarProvider(ABC):
    @abstractmethod
    def get_available_slots(self, date_from: str, date_to: str) -> List[Dict[str, Any]]:
        pass

class BaseMeetingProvider(ABC):
    @abstractmethod
    def create_meeting(self, lead_id: str, scheduled_at: str, duration: int) -> Dict[str, Any]:
        pass

    @abstractmethod
    def get_meeting_status(self, meeting_id: str) -> Dict[str, Any]:
        pass

class BaseAdsProvider(ABC):
    @abstractmethod
    def fetch_campaign_metrics(self, campaign_id: str) -> Dict[str, Any]:
        pass

    @abstractmethod
    def fetch_leads(self, campaign_id: str) -> List[Dict[str, Any]]:
        pass
