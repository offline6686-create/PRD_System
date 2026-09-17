from typing import Dict, Any, List
from .base import BaseAdsProvider

class MockLinkedInAdsProvider(BaseAdsProvider):
    def fetch_campaign_metrics(self, campaign_id: str) -> Dict[str, Any]:
        return {
            "platform": "LINKEDIN_ADS",
            "campaign_id": campaign_id,
            "impressions": 3200,
            "clicks": 95,
            "leads": 8,
            "spend": 140.00,
            "cpl": 17.50
        }

    def fetch_leads(self, campaign_id: str) -> List[Dict[str, Any]]:
        return []
