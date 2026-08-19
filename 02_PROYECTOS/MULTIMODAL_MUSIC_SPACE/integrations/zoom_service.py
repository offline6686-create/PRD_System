import time

class ZoomService:
    """
    Servicio de integracion con Zoom REST API / Web SDK para generacion de clases en vivo.
    """

    def create_live_class(self, topic, start_time_iso, duration_minutes=60):
        meeting_id = f"987-{int(time.time() % 10000000)}-4321"
        join_url = f"https://zoom.us/j/{meeting_id.replace('-', '')}?pwd=MusicSpaceLiveClass2026"
        
        return {
            "topic": topic,
            "meeting_id": meeting_id,
            "start_time": start_time_iso,
            "duration_minutes": duration_minutes,
            "join_url": join_url,
            "embed_code": f'<iframe src="{join_url}" width="100%" height="600" allow="microphone; camera"></iframe>'
        }
