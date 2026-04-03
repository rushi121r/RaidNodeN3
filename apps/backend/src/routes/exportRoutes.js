import { Router } from 'express';
import { exportMyGamesCsv } from '../controllers/exportController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/games.csv', requireAuth, exportMyGamesCsv);

export default router;
