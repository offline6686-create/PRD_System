from typing import Dict, Any, List
import random

class CommercialAIService:
    """
    Commercial AI Assistant for WELLNESS LEAD ENGINE.
    Generates content, scripts, objection responses, and reels ideas.
    STRICT COMPLIANCE:
    - No medical or curative promises.
    - No economic or income promises.
    - Strict adherence to Herbalife & Meta Advertising policies.
    """
    HERBALIFE_LEGAL_DISCLAIMER = (
        "Descargo de responsabilidad: Los resultados varían según el compromiso individual con un estilo de vida activo y una nutrición equilibrada. "
        "No se prometen ingresos garantizados ni curación de patologías médicas."
    )

    def generate_reel_ideas(self, count: int = 5) -> List[Dict[str, Any]]:
        topics = [
            ("5 Hábitos Mañaneros para Mayor Energía", "Muestra tu rutina de hidratación y organización diaria."),
            ("Cómo Mantener la Constancia sin Morir en el Intento", "Habla de la regla de los 2 minutos aplicada al bienestar."),
            ("Mitos Rápidos sobre la Nutrición Diaria", "Desmitifica saltarse comidas de forma cercana y profesional."),
            ("Organización Semanal de Comidas (Meal Prep Fácil)", "Tips prácticos para preparar tus colaciones de la semana."),
            ("La Importancia de la Comunidad en tus Metas de Salud", "Reflexión sobre el acompañamiento y las reuniones virtuales por Zoom.")
        ]
        results = []
        for title, script in topics[:count]:
            results.append({
                "title": title,
                "hook": f"¿Te cuesta mantener tus hábitos de bienestar durante la semana?",
                "script_outline": script,
                "call_to_action": "Comenta 'HÁBITOS' o envía un mensaje directo para agendar una evaluación postural/nutricional por Zoom.",
                "disclaimer": self.HERBALIFE_LEGAL_DISCLAIMER
            })
        return results

    def respond_to_objection(self, objection_type: str) -> Dict[str, Any]:
        responses = {
            "NO_TIME": (
                "Entiendo perfectamente tu tiempo acotado. Justamente por eso nuestro programa está diseñado en módulos de 15 minutos diarios "
                "que se adaptan a tu rutina actual sin modificar abruptamente tu agenda."
            ),
            "NO_MONEY": (
                "Comprendo tu punto de vista. El primer paso es una evaluación totalmente gratuita por Zoom donde diagnosticamos tus hábitos "
                "actuales sin ningún tipo de compromiso económico previo."
            ),
            "FEAR_OF_FAILURE": (
                "Es muy común sentir incertidumbre si probaste otras opciones antes. Nuestro enfoque se basa en el acompañamiento en comunidad "
                "y seguimiento personalizado paso a paso."
            )
        }
        answer = responses.get(objection_type.upper(), (
            "Agradezco tu consulta. Te invito a una breve reunión de 20 minutos por Zoom para resolver tus dudas de forma personalizada."
        ))

        return {
            "objection": objection_type,
            "recommended_response": answer,
            "next_step": "Agendar reunión por Zoom",
            "disclaimer": self.HERBALIFE_LEGAL_DISCLAIMER
        }

    def generate_zoom_script(self, lead_objective: str) -> Dict[str, Any]:
        return {
            "structure": [
                "1. Bienvenida y Rompehielos (3 min) - Preguntar sobre su rutina diaria en su ciudad.",
                "2. Diagnóstico de Objetivos (7 min) - Identificar metas de energía, hábito o nutrición.",
                "3. Presentación Educativa (7 min) - Explicar los pilares de nutrición equilibrada y comunidad.",
                "4. Cierre y Próximos Pasos (3 min) - Coordinar seguimiento o derivación al distribuidor local asignado."
            ],
            "tone": "Profesional, cercano, educativo y motivador.",
            "prohibited_phrases": [
                "Promesas de bajada de peso garantizada",
                "Promesas de ganancias monetarias fijas",
                "Diagnósticos médicos"
            ],
            "disclaimer": self.HERBALIFE_LEGAL_DISCLAIMER
        }
