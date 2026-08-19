import hashlib
import json

def generate_hash(trade_data):
    """
    Genera una firma criptográfica inmutable en SHA-256 a partir de los datos de la orden.
    Garantiza la trazabilidad y auditoría sin manipulación.
    """
    serialized = json.dumps(trade_data, sort_keys=True)
    return hashlib.sha256(serialized.encode('utf-8')).hexdigest()
