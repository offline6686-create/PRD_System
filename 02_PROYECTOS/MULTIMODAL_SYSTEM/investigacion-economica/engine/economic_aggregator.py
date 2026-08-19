from connectors.fed_connector import FedConnector
from connectors.bce_connector import BceConnector
from connectors.bcra_connector import BcraConnector
from connectors.fmi_connector import FmiConnector
import json

class EconomicAggregator:
    """
    Agregador que consolida las series macroeconómicas de la FED, BCE, BCRA y FMI 
    en una estructura JSON unificada para consumo del dashboard.
    """

    def __init__(self):
        self.fed = FedConnector()
        self.bce = BceConnector()
        self.bcra = BcraConnector()
        self.fmi = FmiConnector()

    def get_dashboard_summary(self):
        fed_rates = self.fed.fetch_interest_rate()
        fed_cpi = self.fed.fetch_cpi_inflation()
        ecb_rates = self.bce.fetch_ecb_rate()
        bcra_reserves = self.bcra.fetch_reserves_usd()
        bcra_ipc = self.bcra.fetch_ipc_monthly()
        fmi_gdp = self.fmi.fetch_gdp_projections().to_dict(orient="records")

        return {
            "fed": {
                "latest_rate": fed_rates.iloc[-1],
                "latest_cpi_yoy": fed_cpi.iloc[-1],
                "history_dates": [d.strftime("%Y-%m") for d in fed_rates.index],
                "rates": fed_rates.tolist()
            },
            "bce": {
                "latest_rate": ecb_rates.iloc[-1],
                "latest_hicp_yoy": self.bce.fetch_hicp_inflation().iloc[-1]
            },
            "bcra": {
                "latest_reserves_usd_m": bcra_reserves.iloc[-1],
                "latest_ipc_monthly": bcra_ipc.iloc[-1]
            },
            "fmi_gdp_projections": fmi_gdp
        }

if __name__ == "__main__":
    agg = EconomicAggregator()
    summary = agg.get_dashboard_summary()
    print(json.dumps(summary, indent=2))
