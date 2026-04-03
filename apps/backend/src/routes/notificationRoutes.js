import { Router } from 'express';
import { sendNotification } from '../controllers/notificationController.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

router.post('/', requireAuth, requireRole('ADMIN', 'CENTER_MANAGER'), sendNotification);

export default router;
