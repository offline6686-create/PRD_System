def generate_signal(current_price, recent_high, recent_low):
    """
    Estrategia simple:
    - BUY si rompe el máximo reciente
    - SELL si rompe el mínimo reciente
    """

    if current_price > recent_high:
        return "BUY"
    elif current_price < recent_low:
        return "SELL"
    else:
        return None
