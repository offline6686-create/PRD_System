import unittest
from domain.enums import UserRole
from providers.tiktok_ads import MockTikTokAdsProvider

class TestTikTokAdminSecurity(unittest.TestCase):
    def test_tiktok_admin_access_allowed(self):
        # Administrator role should succeed
        provider = MockTikTokAdsProvider(current_user_role=UserRole.ADMINISTRATOR)
        metrics = provider.fetch_campaign_metrics("camp_123")
        self.assertEqual(metrics["platform"], "TIKTOK_ADS")
        self.assertEqual(metrics["access_granted"], "ADMINISTRATOR_ONLY")

    def test_tiktok_non_admin_access_denied(self):
        # Distributor, Client, or Alumno role must raise PermissionError
        for role in [UserRole.DISTRIBUTOR, UserRole.CLIENT, UserRole.ALUMNO]:
            with self.assertRaises(PermissionError):
                MockTikTokAdsProvider(current_user_role=role)

if __name__ == "__main__":
    unittest.main()
