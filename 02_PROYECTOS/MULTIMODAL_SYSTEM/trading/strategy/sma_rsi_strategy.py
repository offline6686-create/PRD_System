class SmaRsiStrategy:
    """
    Estrategia cuantitativa basada en Cruce de Medias Móviles (SMA 50 / SMA 200) 
    con confirmación de fuerza por Índice de Fuerza Relativa (RSI).
    """

    def __init__(self, fast_period=50, slow_period=200, rsi_period=14):
        self.fast_period = fast_period
        self.slow_period = slow_period
        self.rsi_period = rsi_period

    def generate_signal(self, current_price, sma_fast, sma_slow, rsi_value):
        """
        Retorna:
        - "BUY" si SMA rápida cruza sobre la lenta y RSI > 50 (tendencia alcista sólida).
        - "SELL" si SMA rápida cae por debajo de la lenta y RSI < 50 (tendencia bajista sólida).
        - None si no hay señal clara.
        """
        if sma_fast > sma_slow and rsi_value > 50:
            return {
                "action": "BUY",
                "price": current_price,
                "reason": f"SMA50 ({sma_fast}) > SMA200 ({sma_slow}) & RSI ({rsi_value}) > 50",
                "stop_loss_pips": 25,
                "take_profit_pips": 50
            }
        elif sma_fast < sma_slow and rsi_value < 50:
            return {
                "action": "SELL",
                "price": current_price,
                "reason": f"SMA50 ({sma_fast}) < SMA200 ({sma_slow}) & RSI ({rsi_value}) < 50",
                "stop_loss_pips": 25,
                "take_profit_pips": 50
            }
        return None
