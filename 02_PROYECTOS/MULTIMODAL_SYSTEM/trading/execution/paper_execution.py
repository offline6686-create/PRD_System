import time
import random

def execute_trade(signal, current_price, lot_size, symbol="EURUSD"):
    """
    Simula la ejecución de una orden en mercado incluyendo cálculo de spread y slippage.
    """
    spread_pips = 1.2
    spread_cost = (spread_pips * 0.0001) if "JPY" not in symbol else (spread_pips * 0.01)
    
    action = signal["action"]
    stop_loss_pips = signal.get("stop_loss_pips", 20)
    take_profit_pips = signal.get("take_profit_pips", 40)
    
    # Aplicar spread al precio de entrada
    entry_price = current_price + spread_cost if action == "BUY" else current_price - spread_cost
    
    # Calcular niveles de SL y TP
    pip_multiplier = 0.01 if "JPY" in symbol else 0.0001
    sl_price = entry_price - (stop_loss_pips * pip_multiplier) if action == "BUY" else entry_price + (stop_loss_pips * pip_multiplier)
    tp_price = entry_price + (take_profit_pips * pip_multiplier) if action == "BUY" else entry_price - (take_profit_pips * pip_multiplier)

    # Simular PnL aleatorio entre win y loss moderado para pruebas integradas
    win = random.choice([True, True, False]) # 66% win rate simulado
    pnl = (take_profit_pips * 10 * lot_size) if win else (-stop_loss_pips * 10 * lot_size)

    trade_record = {
        "timestamp": int(time.time()),
        "symbol": symbol,
        "action": action,
        "lot_size": lot_size,
        "entry_price": round(entry_price, 5),
        "stop_loss": round(sl_price, 5),
        "take_profit": round(tp_price, 5),
        "status": "CLOSED",
        "result": "WIN" if win else "LOSS",
        "pnl": round(pnl, 2)
    }

    return trade_record
