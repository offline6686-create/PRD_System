import { Router } from 'express';
import { LibraryController } from './library.controller';
import { authenticate, authorize } from '../app/middleware/auth.middleware';

const router = Router();

router.use(authenticate);
router.get('/items', authorize('ADMIN', 'TEACHER', 'STUDENT', 'CLIENT'), LibraryController.getItems);

export default router;
