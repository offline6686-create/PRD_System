import { Router } from 'express';
import { EconomyController } from './economy.controller';
import { authenticate, authorize } from '../app/middleware/auth.middleware';

const router = Router();

router.use(authenticate);
router.use(authorize('ADMIN')); // Only ADMIN initially

router.get('/providers', EconomyController.getProviders);
router.get('/indicators', EconomyController.getIndicators);
router.get('/status', EconomyController.getStatus);

export default router;
