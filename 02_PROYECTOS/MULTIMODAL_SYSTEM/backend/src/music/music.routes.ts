import { Router } from 'express';
import { MusicController } from './music.controller';
import { authenticate, authorize } from '../app/middleware/auth.middleware';

const router = Router();

router.use(authenticate);

// Courses & Classes (ADMIN, TEACHER, STUDENT)
router.get('/courses', authorize('ADMIN', 'TEACHER', 'STUDENT'), MusicController.getCourses);
router.get('/classes', authorize('ADMIN', 'TEACHER', 'STUDENT'), MusicController.getClasses);
router.get('/recordings', authorize('ADMIN', 'TEACHER', 'STUDENT'), MusicController.getRecordings);

// Zoom Meeting Creation (ADMIN, TEACHER only)
router.post('/meetings', authorize('ADMIN', 'TEACHER'), MusicController.createZoomMeeting);

export default router;
