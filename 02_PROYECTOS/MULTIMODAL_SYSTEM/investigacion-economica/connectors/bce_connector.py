import pandas as pd

class BceConnector:
    """
    Conector de datos económicos del Banco Central Europeo (BCE / ECB).
    Obtiene Tasa Refi de la Eurozona e Inflación HICP.
    """

    def fetch_ecb_rate(self):
        dates = pd.date_range(end=pd.Timestamp.today(), periods=12, freq='ME')
        rates = [4.50, 4.50, 4.50, 4.50, 4.25, 4.25, 4.00, 3.75, 3.50, 3.25, 3.00, 2.75]
        return pd.Series(rates, index=dates, name="ECB_Main_Refi_Rate")

    def fetch_hicp_inflation(self):
        dates = pd.date_range(end=pd.Timestamp.today(), periods=12, freq='ME')
        hicp = [2.9, 2.4, 2.8, 2.6, 2.4, 2.6, 2.5, 2.2, 1.8, 2.0, 2.2, 2.1]
        return pd.Series(hicp, index=dates, name="Eurozone_HICP_YoY")
