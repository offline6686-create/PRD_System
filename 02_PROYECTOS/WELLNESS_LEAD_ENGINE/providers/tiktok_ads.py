from typing import Dict, Any, List
from domain.enums import UserRole
from .base import BaseAdsProvider

class MockTikTokAdsProvider(BaseAdsProvider):
    """
    TikTok Ads Provider.
    RESTRICTION: Explicitly restricted to ADMINISTRATOR role only (per user requirement).
    """
    def __init__(self, current_user_role: UserRole = UserRole.ADMINISTRATOR):
        self.current_user_role = current_user_role
        self._enforce_admin_access()

    def _enforce_admin_access(self):
        if self.current_user_role != UserRole.ADMINISTRATOR:
            raise PermissionError("TikTok Ads integration is restricted to ADMINISTRATOR role only.")

    def fetch_campaign_metrics(self, campaign_id: str) -> Dict[str, Any]:
        self._enforce_admin_access()
        return {
            "platform": "TIKTOK_ADS",
            "campaign_id": campaign_id,
            "impressions": 28400,
            "clicks": 1120,
            "leads": 64,
            "spend": 110.00,
            "cpl": 1.72,
            "access_granted": "ADMINISTRATOR_ONLY"
        }

    def fetch_leads(self, campaign_id: str) -> List[Dict[str, Any]]:
        self._enforce_admin_access()
        return []
