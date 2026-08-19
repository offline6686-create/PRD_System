import pandas as pd
import requests

class FedConnector:
    """
    Conector de datos económicos de la Reserva Federal (FED / FRED Data).
    Obtiene tasas de interés (Fed Funds), CPI (Inflación), Desempleo y Rendimiento de Bonos a 10 años.
    """

    def fetch_interest_rate(self):
        # Simulación de serie temporal de tasa FED (%)
        dates = pd.date_range(end=pd.Timestamp.today(), periods=12, freq='ME')
        rates = [5.25, 5.25, 5.50, 5.50, 5.50, 5.50, 5.25, 5.00, 4.75, 4.50, 4.50, 4.25]
        return pd.Series(rates, index=dates, name="FED_Funds_Rate")

    def fetch_cpi_inflation(self):
        dates = pd.date_range(end=pd.Timestamp.today(), periods=12, freq='ME')
        cpi_yoy = [3.7, 3.4, 3.2, 3.1, 3.2, 3.5, 3.4, 3.3, 2.9, 2.6, 2.4, 2.3]
        return pd.Series(cpi_yoy, index=dates, name="US_CPI_YoY")
