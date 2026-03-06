from pathlib import Path


def save_hash(trade_hash):
    base_path = Path(__file__).resolve().parent
    log_path = base_path / "trade_hashes.log"

    with open(log_path, "a") as f:
        f.write(trade_hash + "\n")