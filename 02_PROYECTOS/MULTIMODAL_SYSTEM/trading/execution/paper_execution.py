import random
import datetime


def execute_trade(signal, price, lot_size):
    """
    Simula ejecución de trade (paper trading)
    SOLO ejecuta y devuelve trade_data
    """

    print("----- EXECUTING TRADE -----")
    print(f"Signal: {signal}")
    print(f"Entry Price: {price}")
    print(f"Lot Size: {lot_size}")

    pnl = random.uniform(-100, 150)
    print(f"PnL: {pnl:.2f}")

    trade_data = {
        "signal": signal,
        "price": price,
        "lot_size": lot_size,
        "pnl": pnl,
        "timestamp": str(datetime.datetime.now())
    }

    print("---------------------------")

    return trade_data
