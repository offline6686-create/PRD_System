from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import (
    leads, campaigns, locations, meetings,
    funnel, analytics, integrations, tiktok_ads_router, academy
)

app = FastAPI(
    title="WELLNESS LEAD ENGINE API",
    description="Motor de captación, CRM, embudo de ventas y seguimiento geográfico global para PRD-FORGE.",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(leads.router)
app.include_router(campaigns.router)
app.include_router(locations.router)
app.include_router(meetings.router)
app.include_router(funnel.router)
app.include_router(analytics.router)
app.include_router(integrations.router)
app.include_router(tiktok_ads_router.router)
app.include_router(academy.router)

@app.get("/")
def health_check():
    return {
        "status": "online",
        "module": "WELLNESS LEAD ENGINE",
        "system": "PRD-FORGE",
        "version": "1.0.0",
        "providers_status": "MOCK_ACTIVE"
    }
