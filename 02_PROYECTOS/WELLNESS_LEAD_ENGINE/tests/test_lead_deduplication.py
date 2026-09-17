import unittest
from services.lead_service import LeadService
from schemas.lead import LeadCreate
from domain.enums import Source, Interest

class TestLeadDeduplication(unittest.TestCase):
    def test_lead_creation_and_duplicate_detection(self):
        service = LeadService()

        # Create original lead
        payload1 = LeadCreate(
            first_name="Carlos",
            last_name="Pérez",
            email="carlos.perez@example.com",
            phone="+5492284123456",
            whatsapp="+5492284123456",
            city="Olavarría",
            province="Buenos Aires",
            country="Argentina",
            source=Source.META_ADS,
            interest=Interest.HEALTHY_HABITS
        )
        lead1 = service.create_lead(payload1)
        self.assertGreater(lead1.lead_score, 0)

        # Check duplicate on same email
        dup_res = service.check_duplicate(
            email="carlos.perez@example.com",
            whatsapp=None,
            phone=None,
            first_name="Carlos",
            last_name="Pérez"
        )
        self.assertTrue(dup_res["is_duplicate"])
        self.assertEqual(dup_res["match_type"], "EMAIL_EXACT")
        self.assertEqual(dup_res["existing_lead_id"], lead1.id)

if __name__ == "__main__":
    unittest.main()
