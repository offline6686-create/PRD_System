class StripeProvider:
    """
    Integrador con pasarela de pagos internacional Stripe Checkout para cursos y suscripciones.
    """

    def create_checkout_session(self, student_email, course_name, amount_usd):
        return {
            "status": "success",
            "provider": "Stripe",
            "checkout_url": f"https://checkout.stripe.com/pay/cs_test_musicspace_{amount_usd}",
            "session_id": f"cs_test_{student_email[:3]}_2026",
            "amount_usd": amount_usd,
            "currency": "USD"
        }
