from typing import Dict, Any, List
from .base import BaseAdsProvider

class MockMetaAdsProvider(BaseAdsProvider):
    def fetch_campaign_metrics(self, campaign_id: str) -> Dict[str, Any]:
        return {
            "platform": "META_ADS",
            "campaign_id": campaign_id,
            "impressions": 15400,
            "clicks": 620,
            "leads": 45,
            "spend": 120.50,
            "cpl": 2.68
        }

    def fetch_leads(self, campaign_id: str) -> List[Dict[str, Any]]:
        return []
