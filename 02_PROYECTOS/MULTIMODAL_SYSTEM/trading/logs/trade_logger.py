import csv
from pathlib import Path


def save_trade(trade_data):
    base_path = Path(__file__).resolve().parent
    log_path = base_path / "trades.csv"

    file_exists = log_path.exists()

    with open(log_path, "a", newline="") as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=trade_data.keys())

        if not file_exists:
            writer.writeheader()

        writer.writerow(trade_data)