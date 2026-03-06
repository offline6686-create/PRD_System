from strategy.simple_breakout import generate_signal
from balance.balance_manager import BalanceManager


def run_backtest(data, initial_balance=10000, risk_percent=0.01, rr_ratio=2):

    balance_manager = BalanceManager(initial_balance=initial_balance)

    trades = []

    for i in range(1, len(data)):

        current_price = data[i]["close"]
        recent_high = data[i-1]["high"]
        recent_low = data[i-1]["low"]

        signal = generate_signal(current_price, recent_high, recent_low)

        if signal:

            risk_amount = balance_manager.balance * risk_percent

            # Simulación simple:
            # Si la siguiente vela sigue a favor → gana
            # Si no → pierde
            next_close = data[i]["close"]
            prev_close = data[i-1]["close"]

            if signal == "BUY":
                win = next_close > prev_close
            elif signal == "SELL":
                win = next_close < prev_close
            else:
                win = False

            if win:
                pnl = risk_amount * rr_ratio
            else:
                pnl = -risk_amount

            balance_manager.update_balance(pnl)

            trades.append({
                "signal": signal,
                "entry_price": current_price,
                "pnl": pnl,
                "balance": balance_manager.balance
            })

    return trades, balance_manager.get_metrics()