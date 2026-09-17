from fastapi import APIRouter, status
from typing import List
from uuid import uuid4, UUID
from datetime import datetime

from schemas.campaign import CampaignCreate, CampaignResponse
from domain.enums import Platform

router = APIRouter(prefix="/api/wellness/campaigns", tags=["Campaigns"])

_in_memory_campaigns: List[CampaignResponse] = []

@router.get("/", response_model=List[CampaignResponse])
def list_campaigns():
    return _in_memory_campaigns

@router.post("/", response_model=CampaignResponse, status_code=status.HTTP_201_CREATED)
def create_campaign(payload: CampaignCreate):
    campaign = CampaignResponse(
        id=uuid4(),
        name=payload.name,
        platform=payload.platform,
        description=payload.description,
        objective=payload.objective,
        status=payload.status,
        budget=payload.budget,
        start_date=payload.start_date,
        end_date=payload.end_date,
        utm_source=payload.utm_source,
        utm_medium=payload.utm_medium,
        utm_campaign=payload.utm_campaign,
        created_at=datetime.utcnow()
    )
    _in_memory_campaigns.append(campaign)
    return campaign
