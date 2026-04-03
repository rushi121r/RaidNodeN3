import { Router } from 'express';
import { createCenter, listCenters } from '../controllers/centerController.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

router.get('/', listCenters);
router.post('/', requireAuth, requireRole('ADMIN', 'CENTER_MANAGER'), createCenter);

export default router;
