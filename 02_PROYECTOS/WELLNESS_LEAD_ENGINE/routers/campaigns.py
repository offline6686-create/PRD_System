from fastapi import APIRouter, status
from typing import List
from uuid import uuid4, UUID
from datetime import datetime

from schemas.campaign import CampaignCreate, CampaignResponse
from domain.enums import Platform

router = APIRouter(prefix="/api/wellness/campaigns", tags=["Campaigns"])

_in_memory_campaigns: List[CampaignResponse] = [
    CampaignResponse(
        id=uuid4(),
        name="Hábitos Saludables - Olavarría & Azul",
        platform=Platform.META_ADS,
        description="Campaña Meta Ads orientada a bienestar en la zona centro de Buenos Aires.",
        objective="LEAD_GENERATION",
        status="ACTIVE",
        budget=150.00,
        start_date=datetime.utcnow(),
        utm_source="facebook",
        utm_medium="cpc",
        utm_campaign="habitos_olavarria",
        created_at=datetime.utcnow()
    )
]

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
