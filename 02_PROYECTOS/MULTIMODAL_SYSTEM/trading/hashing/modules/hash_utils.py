import hashlib
import json

def generate_hash(data):

    raw = json.dumps(
        data,
        sort_keys=True
    )

    return hashlib.sha256(
        raw.encode()
    ).hexdigest()
