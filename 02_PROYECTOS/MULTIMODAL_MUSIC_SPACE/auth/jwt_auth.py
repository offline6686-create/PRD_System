import jwt
import datetime

SECRET_KEY = "music_space_super_secret_jwt_key_2026"

def generate_student_token(student_id, student_email, name, role="student"):
    """
    Genera un token JWT seguro para el login de un alumno con expiracion en 24 horas.
    """
    payload = {
        "sub": student_id,
        "email": student_email,
        "name": name,
        "role": role,
        "iat": datetime.datetime.utcnow(),
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24)
    }
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")

def verify_student_token(token):
    """
    Decodifica y valida el token JWT de un alumno.
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return True, payload
    except jwt.ExpiredSignatureError:
        return False, "El token ha expirado. Por favor inicia sesion de nuevo."
    except jwt.InvalidTokenError:
        return False, "Token de alumno invalido."
