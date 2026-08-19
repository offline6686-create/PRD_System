import sqlite3
from pathlib import Path
import time

class AuditLogger:
    """
    Guarda los registros de firmas criptográficas (hashes SHA-256) de operaciones
    en una base de datos de auditoría SQLite inmutable.
    """

    def __init__(self, db_path=None):
        if db_path is None:
            db_path = Path(__file__).resolve().parent.parent / "logs" / "audit_trail.db"
        self.db_path = Path(db_path)
        self.db_path.parent.mkdir(parents=True, exist_ok=True)
        self._init_db()

    def _init_db(self):
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS trade_audit (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    timestamp INTEGER,
                    trade_hash TEXT NOT NULL,
                    symbol TEXT,
                    action TEXT,
                    lot_size REAL,
                    pnl REAL
                )
            """)
            conn.commit()

    def log_trade(self, trade_data, trade_hash):
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            cursor.execute("""
                INSERT INTO trade_audit (timestamp, trade_hash, symbol, action, lot_size, pnl)
                VALUES (?, ?, ?, ?, ?, ?)
            """, (
                trade_data.get("timestamp", int(time.time())),
                trade_hash,
                trade_data.get("symbol", "UNKNOWN"),
                trade_data.get("action", "UNKNOWN"),
                trade_data.get("lot_size", 0.0),
                trade_data.get("pnl", 0.0)
            ))
            conn.commit()

def save_hash(trade_hash):
    logger = AuditLogger()
    logger.log_trade({}, trade_hash)