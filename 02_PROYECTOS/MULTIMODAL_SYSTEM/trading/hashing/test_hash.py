from modules.hash_utils import generate_hash


data = {
    "event": "trade",
    "symbol": "EURUSD",
    "pnl": 150
}

print(generate_hash(data))
