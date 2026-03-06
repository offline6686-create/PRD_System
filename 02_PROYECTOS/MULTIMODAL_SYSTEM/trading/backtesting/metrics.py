def calculate_metrics(trades):

    total_trades = len(trades)

    if total_trades == 0:
        return {}

    wins = [t for t in trades if t["pnl"] > 0]
    losses = [t for t in trades if t["pnl"] < 0]

    win_rate = len(wins) / total_trades * 100

    avg_win = sum(t["pnl"] for t in wins) / len(wins) if wins else 0
    avg_loss = sum(t["pnl"] for t in losses) / len(losses) if losses else 0

    gross_profit = sum(t["pnl"] for t in wins)
    gross_loss = abs(sum(t["pnl"] for t in losses))

    profit_factor = gross_profit / gross_loss if gross_loss != 0 else float("inf")

    expectancy = (win_rate/100 * avg_win) + ((1 - win_rate/100) * avg_loss)

    return {
        "total_trades": total_trades,
        "win_rate_percent": round(win_rate, 2),
        "average_win": round(avg_win, 2),
        "average_loss": round(avg_loss, 2),
        "profit_factor": round(profit_factor, 2),
        "expectancy": round(expectancy, 2)
    }