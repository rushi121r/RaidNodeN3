import { Router } from 'express';
import { getMyProfile } from '../controllers/playerController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/me', requireAuth, getMyProfile);

export default router;
