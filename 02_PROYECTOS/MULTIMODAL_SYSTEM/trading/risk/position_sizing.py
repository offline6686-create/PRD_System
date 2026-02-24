def calculate_position_size(balance, risk_percent, stop_loss_pips):
    """
    Calcula el tamaño de posición basado en:
    - balance de la cuenta
    - porcentaje de riesgo por trade
    - stop loss en pips
    """

    risk_amount = balance * risk_percent

    # Simulación simple: 1 pip = 1 dólar por lote
    lot_size = risk_amount / stop_loss_pips

    return round(lot_size, 2)
