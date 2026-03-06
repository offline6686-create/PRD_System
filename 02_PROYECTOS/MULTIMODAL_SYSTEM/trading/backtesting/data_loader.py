import csv


def load_csv(filepath):

    data = []

    with open(filepath, "r") as file:
        reader = csv.DictReader(file)

        for row in reader:
            data.append({
                "high": float(row["high"]),
                "low": float(row["low"]),
                "close": float(row["close"])
            })

    return data