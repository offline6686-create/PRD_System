from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import (
    leads, campaigns, locations, meetings,
    funnel, analytics, integrations, tiktok_ads_router, academy,
    economic_trading_router
)

app = FastAPI(
    title="SISTEMA PRD - PLATFORM API",
    description="Motor de captación, CRM, Economic Lab, Trading Bot y seguimiento geográfico global para PRD-FORGE.",
    version="3.0.0"
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
app.include_router(economic_trading_router.router)

from fastapi.responses import HTMLResponse
import os

@app.get("/", response_class=HTMLResponse)
def serve_prd_system_dashboard():
    index_path = os.path.join(os.path.dirname(__file__), "index.html")
    if os.path.exists(index_path):
        with open(index_path, "r", encoding="utf-8") as f:
            return HTMLResponse(content=f.read())
    return HTMLResponse(content="<h1>SISTEMA PRD - WELLNESS LEAD ENGINE API ACTIVE</h1>")

@app.get("/health")
def health_check():
    return {
        "status": "online",
        "module": "WELLNESS LEAD ENGINE",
        "system": "PRD-FORGE",
        "version": "1.0.0"
    }
