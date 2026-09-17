from pydantic import BaseModel
from typing import Optional, List, Dict, Any

class AnalyticsQuery(BaseModel):
    timeframe: str = "30_days" # today, 7_days, 30_days, 90_days, custom
    country: Optional[str] = None
    province: Optional[str] = None
    city: Optional[str] = None
    source: Optional[str] = None
    campaign_id: Optional[str] = None

class DashboardKPIs(BaseModel):
    total_leads: int
    new_leads: int
    qualified_leads: int
    meetings_scheduled: int
    meetings_completed: int
    conversions: int
    customers: int
    qualification_rate: float
    meeting_rate: float
    show_rate: float
    conversion_rate: float
    cpl: Optional[float] = None
    cac: Optional[float] = None

class FunnelStageMetric(BaseModel):
    stage_name: str
    count: int
    percentage: float
    conversion_rate: float
    drop_off_count: int

class GeoMetricItem(BaseModel):
    location: str
    leads_count: int
    qualified_count: int
    meetings_count: int
    conversions_count: int
