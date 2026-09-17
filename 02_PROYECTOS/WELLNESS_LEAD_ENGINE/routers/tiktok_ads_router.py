from fastapi import APIRouter, HTTPException, Header, Depends, Status
from typing import Dict, Any, Optional
from domain.enums import UserRole
from providers.tiktok_ads import MockTikTokAdsProvider

router = APIRouter(prefix="/api/wellness/integrations/tiktok", tags=["TikTok Ads (Admin Only)"])

def get_current_user_role(x_user_role: Optional[str] = Header(None)) -> UserRole:
    if not x_user_role:
        return UserRole.ADMINISTRATOR # Default for local dev admin
    try:
        return UserRole(x_user_role.upper())
    except ValueError:
        return UserRole.CLIENT

@router.get("/metrics/{campaign_id}", response_model=Dict[str, Any])
def get_tiktok_campaign_metrics(
    campaign_id: str,
    user_role: UserRole = Depends(get_current_user_role)
):
    """
    TikTok Ads Metrics API Endpoint.
    SECURITY REQUIREMENT: Strictly restricted to ADMINISTRATOR role only.
    """
    if user_role != UserRole.ADMINISTRATOR:
        raise HTTPException(
            status_code=Status.HTTP_403_FORBIDDEN,
            detail="Access Denied: TikTok Ads integration is restricted exclusively to the ADMINISTRATOR role."
        )
    
    provider = MockTikTokAdsProvider(current_user_role=user_role)
    return provider.fetch_campaign_metrics(campaign_id)
