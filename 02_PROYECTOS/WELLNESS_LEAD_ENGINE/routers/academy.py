from fastapi import APIRouter
from typing import List, Dict, Any
from uuid import uuid4

router = APIRouter(prefix="/api/wellness/academy", tags=["Academy & Knowledge Base"])

_in_memory_academy: List[Dict[str, Any]] = [
    {
        "id": str(uuid4()),
        "title": "Manual de Entrenamiento para Distribuidores",
        "category": "MARKETING",
        "content_type": "PDF",
        "file_url": "/minio/academy/manual_distribuidor_v1.pdf",
        "target_role": "DISTRIBUTOR",
        "description": "Procedimiento operativo estándar para atención y seguimiento presencial y virtual por Zoom."
    },
    {
        "id": str(uuid4()),
        "title": "Guión de Presentación de Hábitos Saludables por Zoom",
        "category": "ZOOM_SCRIPTS",
        "content_type": "SCRIPT",
        "file_url": "/minio/academy/guion_zoom_habitos.pdf",
        "target_role": "ALL",
        "description": "Estructura de 20 minutos para reuniones virtuales con prospectos."
    },
    {
        "id": str(uuid4()),
        "title": "Guía de Respuestas a Objeciones Frecuentes",
        "category": "OBJECTIONS",
        "content_type": "MANUAL",
        "file_url": "/minio/academy/objeciones_respuestas.pdf",
        "target_role": "ALL",
        "description": "Manejo amigable de objeciones sobre tiempo, dinero y dudas iniciales."
    }
]

@router.get("/", response_model=List[Dict[str, Any]])
def list_academy_items():
    return _in_memory_academy
