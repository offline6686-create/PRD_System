import { Router } from 'express';
import authRoutes from '../../auth/auth.routes';
import musicRoutes from '../../music/music.routes';
import economyRoutes from '../../economy/economy.routes';
import ecommerceRoutes from '../../ecommerce/ecommerce.routes';
import tradingRoutes from '../../trading/trading.routes';
import libraryRoutes from '../../library/library.routes';
import adminRoutes from '../../admin/admin.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/music', musicRoutes);
router.use('/economy', economyRoutes);
router.use('/ecommerce', ecommerceRoutes);
router.use('/trading', tradingRoutes);
router.use('/library', libraryRoutes);
router.use('/admin', adminRoutes);

export default router;
