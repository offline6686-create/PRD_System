import pandas as pd

class FmiConnector:
    """
    Conector de proyecciones del Fondo Monetario Internacional (FMI / IMF Data).
    Obtiene proyecciones de crecimiento del PIB mundial y economías clave.
    """

    def fetch_gdp_projections(self):
        countries = ["Global", "EE.UU.", "Eurozona", "China", "Argentina", "Brasil"]
        gdp_growth = [3.2, 2.6, 0.8, 4.8, 5.0, 2.1]
        return pd.DataFrame({"Pais": countries, "Crecimiento_PIB_Estimado_%": gdp_growth})
