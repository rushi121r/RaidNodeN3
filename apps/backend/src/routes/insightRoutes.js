import { Router } from 'express';
import { getAiInsights } from '../controllers/insightController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/me', requireAuth, getAiInsights);

export default router;
