import yaml
from pathlib import Path

class RiskManager:
    """
    Gestor de riesgos conforme a las reglas estrictas de FTMO.
    Soporta verificación de drawdown diario, drawdown total y cálculo de posición por riesgo $.
    """

    def __init__(self, config_path=None):
        if config_path is None:
            config_path = Path(__file__).resolve().parent.parent / "config" / "ftmo_rules.yaml"
        
        self.config_path = Path(config_path)
        self.rules = self._load_rules()
        self.initial_balance = float(self.rules.get("initial_balance", 100000))
        self.max_daily_loss_percent = float(self.rules.get("max_daily_loss_percent", 5.0))
        self.max_total_loss_percent = float(self.rules.get("max_total_loss_percent", 10.0))
        self.risk_per_trade_percent = float(self.rules.get("risk_per_trade_percent", 1.0))
        
        # Buffer de seguridad: frenar si alcanza el 4.5% para evitar romper la regla del 5%
        self.safety_daily_limit_percent = self.max_daily_loss_percent - 0.5

    def _load_rules(self):
        if self.config_path.exists():
            with open(self.config_path, "r", encoding="utf-8") as f:
                return yaml.safe_load(f) or {}
        return {}

    def calculate_position_size(self, balance, stop_loss_pips, pip_value_per_lot=10.0):
        """
        Calcula el lotaje según la distancia del Stop Loss en pips y el porcentaje de riesgo por trade.
        """
        if stop_loss_pips <= 0:
            return 0.01

        risk_amount = balance * (self.risk_per_trade_percent / 100.0)
        risk_per_pip = risk_amount / stop_loss_pips
        lot_size = round(risk_per_pip / pip_value_per_lot, 2)
        return max(0.01, lot_size)

    def is_trade_allowed(self, current_balance, start_of_day_balance, floating_pnl=0.0):
        """
        Evalúa si la cuenta cumple con las reglas FTMO de pérdida diaria y total.
        """
        daily_equity = current_balance + floating_pnl
        daily_loss = start_of_day_balance - daily_equity
        daily_loss_percent = (daily_loss / start_of_day_balance) * 100.0 if start_of_day_balance > 0 else 0.0

        if daily_loss_percent >= self.safety_daily_limit_percent:
            return False, f"Límite diario alcanzado o cercano al máximo FTMO ({daily_loss_percent:.2f}% de pérdida hoy)."

        total_loss = self.initial_balance - daily_equity
        total_loss_percent = (total_loss / self.initial_balance) * 100.0

        if total_loss_percent >= self.max_total_loss_percent:
            return False, f"Límite de pérdida total de FTMO violado ({total_loss_percent:.2f}% de pérdida total)."

        return True, "Operación autorizada por el Risk Manager."
