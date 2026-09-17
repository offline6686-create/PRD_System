from fastapi import APIRouter, Status
from typing import List
from uuid import uuid4
from datetime import datetime

from schemas.location import LocationCreate, LocationResponse

router = APIRouter(prefix="/api/wellness/locations", tags=["Locations"])

_in_memory_locations: List[LocationResponse] = [
    LocationResponse(id=uuid4(), country="Argentina", province_state="Buenos Aires", city="Olavarría", postal_code="7400", timezone="America/Argentina/Buenos_Aires", created_at=datetime.utcnow()),
    LocationResponse(id=uuid4(), country="Argentina", province_state="Buenos Aires", city="Tandil", postal_code="7000", timezone="America/Argentina/Buenos_Aires", created_at=datetime.utcnow()),
    LocationResponse(id=uuid4(), country="Argentina", province_state="Buenos Aires", city="Azul", postal_code="7300", timezone="America/Argentina/Buenos_Aires", created_at=datetime.utcnow()),
    LocationResponse(id=uuid4(), country="Argentina", province_state="Buenos Aires", city="Buenos Aires", postal_code="1000", timezone="America/Argentina/Buenos_Aires", created_at=datetime.utcnow()),
    LocationResponse(id=uuid4(), country="Argentina", province_state="Córdoba", city="Córdoba", postal_code="5000", timezone="America/Argentina/Cordoba", created_at=datetime.utcnow()),
    LocationResponse(id=uuid4(), country="Estados Unidos", province_state="Florida", city="Miami", postal_code="33101", timezone="America/New_York", created_at=datetime.utcnow()),
    LocationResponse(id=uuid4(), country="España", province_state="Madrid", city="Madrid", postal_code="28001", timezone="Europe/Madrid", created_at=datetime.utcnow())
]

@router.get("/", response_model=List[LocationResponse])
def list_locations():
    return _in_memory_locations

@router.post("/", response_model=LocationResponse, status_code=Status.HTTP_201_CREATED)
def create_location(payload: LocationCreate):
    loc = LocationResponse(
        id=uuid4(),
        country=payload.country,
        province_state=payload.province_state,
        city=payload.city,
        postal_code=payload.postal_code,
        timezone=payload.timezone,
        created_at=datetime.utcnow()
    )
    _in_memory_locations.append(loc)
    return loc
