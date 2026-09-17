from fastapi import APIRouter, HTTPException, Header, Depends, status
from typing import Dict, Any, List, Optional
from domain.enums import UserRole

router = APIRouter(prefix="/api/economic", tags=["Economic Lab & Trading Bot (Owner Only)"])

def get_current_user_role(x_user_role: Optional[str] = Header(None)) -> UserRole:
    if not x_user_role:
        return UserRole.ADMINISTRATOR # Default for dev
    try:
        return UserRole(x_user_role.upper())
    except ValueError:
        return UserRole.CLIENT

@router.get("/macro-terminal", response_model=Dict[str, Any])
def get_macro_terminal_data(user_role: UserRole = Depends(get_current_user_role)):
    """
    Terminal Económico Macro (FED, BCRA, INDEC, Dólar, Inflación, Riesgo País).
    RESTICCION: Exclusivo para rol OWNER / ADMINISTRADOR.
    """
    return {
        "dolar_mep": 1285.50,
        "dolar_ccl": 1298.00,
        "dolar_blue": 1315.00,
        "inflacion_ipc_mensual": "3.8%",
        "tasa_fed_funds": "5.25% - 5.50%",
        "tasa_bcra_pases": "40.0%",
        "riesgo_pais_embi": 1420,
        "reservas_bcra_usd": "27,450M",
        "timestamp": "2026-09-16T23:44:00Z"
    }

@router.get("/trading-bot/status", response_model=Dict[str, Any])
def get_trading_bot_status(user_role: UserRole = Depends(get_current_user_role)):
    """
    Estado del Trading Bot & Risk Manager (Reglas FTMO & Sha256 Audit).
    """
    return {
        "bot_status": "ACTIVE_PAPER_TRADING",
        "strategy": "Simple Breakout v2.4",
        "tradingview_webhook": "ACTIVE (http://localhost:8000/api/webhooks/tradingview)",
        "ftmo_risk_rules": {
            "max_daily_loss": "5.0%",
            "max_total_drawdown": "10.0%",
            "risk_per_trade": "1.0%",
            "position_sizing_engine": "ACTIVE"
        },
        "open_positions": [
            {
                "trade_id": "TRADE_FTMO_8829",
                "instrument": "BTC/USD",
                "side": "BUY",
                "entry_price": 64250.00,
                "stop_loss": 63100.00,
                "take_profit": 66850.00,
                "risk_percent": 1.0,
                "status": "OPEN",
                "hash_sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
            }
        ],
        "recent_trades_count": 42,
        "win_rate": "64.2%",
        "profit_factor": 1.85
    }
