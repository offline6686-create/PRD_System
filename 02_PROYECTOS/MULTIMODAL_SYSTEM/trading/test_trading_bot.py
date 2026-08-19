import unittest
from risk.risk_manager import RiskManager
from strategy.sma_rsi_strategy import SmaRsiStrategy
from execution.paper_execution import execute_trade
from hashing.modules.hash_utils import generate_hash
from audit.audit_logger import AuditLogger
from balance.balance_manager import BalanceManager

class TestFtmoTradingBot(unittest.TestCase):

    def setUp(self):
        self.risk_mgr = RiskManager()
        self.strategy = SmaRsiStrategy()
        self.balance_mgr = BalanceManager(100000.0)
        self.audit_logger = AuditLogger()

    def test_risk_manager_allow_trade(self):
        allowed, msg = self.risk_mgr.is_trade_allowed(100000.0, 100000.0)
        self.assertTrue(allowed)

    def test_risk_manager_daily_drawdown_block(self):
        # Si la pérdida diaria supera el 4.5%, debe bloquear
        allowed, msg = self.risk_mgr.is_trade_allowed(95000.0, 100000.0)
        self.assertFalse(allowed)

    def test_position_sizing(self):
        lots = self.risk_mgr.calculate_position_size(100000.0, stop_loss_pips=25)
        self.assertGreater(lots, 0.0)

    def test_strategy_and_execution_pipeline(self):
        signal = self.strategy.generate_signal(current_price=1.1000, sma_fast=1.1050, sma_slow=1.1000, rsi_value=58)
        self.assertIsNotNone(signal)
        self.assertEqual(signal["action"], "BUY")

        lots = self.risk_mgr.calculate_position_size(100000.0, signal["stop_loss_pips"])
        trade = execute_trade(signal, 1.1000, lots, symbol="EURUSD")
        
        trade_hash = generate_hash(trade)
        self.assertEqual(len(trade_hash), 64) # SHA-256 hash length

        self.audit_logger.log_trade(trade, trade_hash)
        self.balance_mgr.update_balance(trade["pnl"])
        self.assertIn("current_balance", self.balance_mgr.get_metrics())

if __name__ == "__main__":
    unittest.main()
