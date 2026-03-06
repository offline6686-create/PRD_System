from strategy.simple_breakout import generate_signal
from risk.position_sizing import calculate_position_size
from execution.paper_execution import execute_trade
from balance.balance_manager import BalanceManager
from hashing.modules.hash_utils import generate_hash
from audit.audit_logger import save_hash
from logs.trade_logger import save_trade
from config.settings import ACCOUNT_BALANCE, RISK_PER_TRADE
import yaml
from pathlib import Path


balance_manager = BalanceManager(initial_balance=ACCOUNT_BALANCE)


def load_ftmo_rules():
    base_path = Path(__file__).resolve().parent
    rules_path = base_path / "config" / "ftmo_rules.yaml"

    with open(rules_path, "r") as file:
        rules = yaml.safe_load(file)

    return rules


def main():
    rules = load_ftmo_rules()
    print("Loaded FTMO Rules:")
    print(rules)

    current_price = 2000
    recent_high = 1995
    recent_low = 1985

    signal = generate_signal(current_price, recent_high, recent_low)

    if signal:
        lot_size = calculate_position_size(
            balance=balance_manager.balance,
            risk_percent=RISK_PER_TRADE,
            stop_loss_pips=20
        )

        trade = execute_trade(signal, current_price, lot_size)

        # Update balance
        balance_manager.update_balance(trade["pnl"])
        metrics = balance_manager.get_metrics()
        print("Updated Balance Metrics:")
        print(metrics)

        # Hash
        trade_hash = generate_hash(trade)

        # Audit
        save_hash(trade_hash)

        # Log CSV
        save_trade(trade)

        print("Trade Hash:", trade_hash)

    else:
        print("No trade signal.")


if __name__ == "__main__":
    main()
    