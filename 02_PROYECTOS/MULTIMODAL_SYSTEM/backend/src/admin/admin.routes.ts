import { Router } from 'express';
import { AdminController } from './admin.controller';
import { authenticate, authorize } from '../app/middleware/auth.middleware';

const router = Router();

router.use(authenticate);
router.use(authorize('ADMIN')); // Only ADMIN can access

router.get('/stats', AdminController.getStats);
router.get('/logs', AdminController.getLogs);

export default router;
