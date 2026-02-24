class BalanceManager:
    def __init__(self, initial_balance=100000):
        self.initial_balance = initial_balance
        self.balance = initial_balance
        self.equity = initial_balance
        self.max_balance = initial_balance
        self.drawdown = 0
        self.daily_loss = 0

    def update_balance(self, pnl):
        self.balance += pnl
        self.equity = self.balance

        if self.balance > self.max_balance:
            self.max_balance = self.balance

        self.drawdown = self.max_balance - self.balance

    def calculate_pnl(self, entry_price, exit_price, lot_size, direction):
        if direction == "BUY":
            return (exit_price - entry_price) * lot_size
        elif direction == "SELL":
            return (entry_price - exit_price) * lot_size
        return 0

    def get_metrics(self):
        return {
            "balance": self.balance,
            "equity": self.equity,
            "drawdown": self.drawdown,
            "daily_loss": self.daily_loss
        }
