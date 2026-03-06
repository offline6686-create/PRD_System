from backtesting.engine import run_backtest
from backtesting.metrics import calculate_metrics

# Dataset simulado
data = [
    {"high": 100, "low": 95, "close": 98},
    {"high": 102, "low": 97, "close": 101},
    {"high": 105, "low": 100, "close": 104},
    {"high": 103, "low": 99, "close": 100},
    {"high": 107, "low": 101, "close": 106},
]

trades, metrics = run_backtest(data)

stats = calculate_metrics(trades)

print("Trades:")
for t in trades:
    print(t)

print("\nFinal Balance Metrics:")
print(metrics)

print("\nStatistical Metrics:")
print(stats)