from balance.balance_manager import BalanceManager

bm = BalanceManager(initial_balance=100000)

pnl = bm.calculate_pnl(
    entry_price=100,
    exit_price=110,
    lot_size=1,
    direction="BUY"
)

bm.update_balance(pnl)

print("Metrics after trade:")
print(bm.get_metrics())
