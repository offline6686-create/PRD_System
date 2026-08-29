from dataclasses import dataclass
from typing import Optional, Any
from datetime import datetime

@dataclass
class EconomicSeries:
    """
    Modelo Interno Unificado para Indicadores Macroeconómicos (FRED, BCRA, FED, etc.)
    """
    source: str          # e.g., 'FRED', 'BCRA', 'INDEC'
    country: str         # e.g., 'US', 'AR'
    asset_type: str      # 'economic_indicator'
    symbol: str          # e.g., 'GDP', 'CPI', 'FEDFUNDS'
    timestamp: datetime
    value: float
    currency: str = "USD"
    metadata: Optional[dict] = None

@dataclass
class AssetMarketData:
    """
    Modelo Interno Unificado para Activos Financieros (BYMA, NYSE, NASDAQ, FOREX, etc.)
    """
    source: str          # e.g., 'BYMA', 'NYSE', 'NASDAQ'
    country: str         # e.g., 'AR', 'US'
    asset_type: str      # 'equity', 'fixed_income', 'forex', 'crypto'
    symbol: str          # e.g., 'AL30', 'AAPL', 'EURUSD'
    timestamp: datetime
    open: float
    high: float
    low: float
    close: float
    volume: float
    currency: str = "USD"
    metadata: Optional[dict] = None
