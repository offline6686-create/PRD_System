class BalanceManager:
    """
    Rastreador de balance, equidad y curva de capital con métricas de High-Water Mark.
    """

    def __init__(self, initial_balance=100000.0):
        self.initial_balance = float(initial_balance)
        self.balance = float(initial_balance)
        self.start_of_day_balance = float(initial_balance)
        self.high_water_mark = float(initial_balance)
        self.trades_history = []

    def update_balance(self, pnl):
        self.balance += float(pnl)
        if self.balance > self.high_water_mark:
            self.high_water_mark = self.balance

    def get_metrics(self):
        total_pnl = self.balance - self.initial_balance
        return {
            "initial_balance": self.initial_balance,
            "current_balance": round(self.balance, 2),
            "high_water_mark": round(self.high_water_mark, 2),
            "total_pnl": round(total_pnl, 2),
            "return_percent": round((total_pnl / self.initial_balance) * 100.0, 2)
        }
