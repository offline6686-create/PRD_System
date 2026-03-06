import random
import datetime

from hashing.modules.hash_utils import generate_hash
from balance.balance_manager import BalanceManager


# Instancia global del balance
balance_manager = BalanceManager(initial_balance=100000)


def execute_trade(signal, price, lot_size):
    """
    Simula ejecución de trade (paper trading)
    """

    print("----- EXECUTING TRADE -----")
    print(f"Signal: {signal}")
    print(f"Entry Price: {price}")
    print(f"Lot Size: {lot_size}")

    # Simulación de PnL
    pnl = random.uniform(-100, 150)
    print(f"PnL: {pnl:.2f}")

    # Actualizar balance
    balance_manager.update_balance(pnl)

    # Mostrar métricas actualizadas
    metrics = balance_manager.get_metrics()
    print("Updated Balance Metrics:")
    print(metrics)

    # Datos del trade para auditoría
    trade_data = {
        "signal": signal,
        "price": price,
        "lot_size": lot_size,
        "pnl": pnl,
        "timestamp": str(datetime.datetime.now())
    }

    # Generar hash
    trade_hash = generate_hash(trade_data)

    # Guardar en auditoría
    with open("audit/trade_hashes.log", "a") as f:
        f.write(trade_hash + "\n")

    print("Trade Hash:", trade_hash)
    print("---------------------------")

    return trade_data