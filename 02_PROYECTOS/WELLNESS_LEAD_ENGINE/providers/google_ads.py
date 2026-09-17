from typing import Dict, Any, List
from .base import BaseAdsProvider

class MockGoogleAdsProvider(BaseAdsProvider):
    def fetch_campaign_metrics(self, campaign_id: str) -> Dict[str, Any]:
        return {
            "platform": "GOOGLE_ADS",
            "campaign_id": campaign_id,
            "impressions": 8900,
            "clicks": 410,
            "leads": 28,
            "spend": 95.00,
            "cpl": 3.39
        }

    def fetch_leads(self, campaign_id: str) -> List[Dict[str, Any]]:
        return []
