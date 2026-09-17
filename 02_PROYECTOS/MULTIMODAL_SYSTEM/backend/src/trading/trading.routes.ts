import { Router } from 'express';
import { TradingController } from './trading.controller';
import { authenticate, authorize } from '../app/middleware/auth.middleware';

const router = Router();

router.use(authenticate);
router.use(authorize('ADMIN')); // Strictly ADMIN

router.get('/strategies', TradingController.getStrategies);
router.get('/backtesting', TradingController.getBacktesting);

export default router;
