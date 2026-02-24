from strategy.simple_breakout import generate_signal
from risk.position_sizing import calculate_position_size
from execution.paper_execution import execute_trade
from config.settings import ACCOUNT_BALANCE, RISK_PER_TRADE
import yaml
from pathlib import Path


def load_ftmo_rules():
    # Ruta absoluta robusta
    base_path = Path(__file__).resolve().parent
    rules_path = base_path / "config" / "ftmo_rules.yaml"

    with open(rules_path, "r") as file:
        rules = yaml.safe_load(file)

    return rules


def main():
    rules = load_ftmo_rules()
    print("Loaded FTMO Rules:")
    print(rules)

    # Simulación de precio actual
    current_price = 2000
    recent_high = 1995
    recent_low = 1985

    signal = generate_signal(current_price, recent_high, recent_low)

    if signal:
        lot_size = calculate_position_size(
            balance=ACCOUNT_BALANCE,
            risk_percent=RISK_PER_TRADE,
            stop_loss_pips=20
        )

        execute_trade(signal, current_price, lot_size)
    else:
        print("No trade signal.")


if __name__ == "__main__":
    main()
