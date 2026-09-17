from fastapi import APIRouter
from typing import List
from schemas.analytics import FunnelStageMetric
from services.funnel_service import FunnelService
from services.lead_service import LeadService

router = APIRouter(prefix="/api/wellness/funnel", tags=["Funnel"])
funnel_service = FunnelService()
lead_service = LeadService()

@router.get("/", response_model=List[FunnelStageMetric])
def get_funnel_metrics():
    leads = lead_service.list_leads(page=1, page_size=1000)
    raw_leads = [{"status": l.status.value} for l in leads]
    return funnel_service.calculate_funnel_metrics(raw_leads)
