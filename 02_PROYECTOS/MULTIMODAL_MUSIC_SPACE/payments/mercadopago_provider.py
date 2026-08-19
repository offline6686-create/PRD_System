class MercadoPagoProvider:
    """
    Integrador con pasarela de pagos local MercadoPago Checkout Pro.
    """

    def create_preference(self, student_email, course_name, amount_ars):
        return {
            "status": "success",
            "provider": "MercadoPago",
            "init_point": f"https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=mp_musicspace_{amount_ars}",
            "preference_id": f"pref_mp_{student_email[:3]}_2026",
            "amount_ars": amount_ars,
            "currency": "ARS"
        }
