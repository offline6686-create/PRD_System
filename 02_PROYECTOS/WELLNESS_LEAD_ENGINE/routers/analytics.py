from fastapi import APIRouter
from typing import List
from schemas.analytics import DashboardKPIs, GeoMetricItem
from services.analytics_service import AnalyticsService
from services.lead_service import LeadService

router = APIRouter(prefix="/api/wellness/analytics", tags=["Analytics"])
analytics_service = AnalyticsService()
lead_service = LeadService()

@router.get("/kpis", response_model=DashboardKPIs)
def get_kpis():
    leads = lead_service.list_leads(page=1, page_size=1000)
    raw_leads = [{"status": l.status.value, "city": l.city, "province": l.province} for l in leads]
    return analytics_service.get_dashboard_kpis(raw_leads)

@router.get("/geo", response_model=List[GeoMetricItem])
def get_geo_distribution():
    leads = lead_service.list_leads(page=1, page_size=1000)
    raw_leads = [{"status": l.status.value, "city": l.city, "province": l.province} for l in leads]
    return analytics_service.get_geo_distribution(raw_leads)
