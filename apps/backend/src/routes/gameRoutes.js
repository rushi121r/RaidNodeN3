import { Router } from 'express';
import { createGame, listMyGames } from '../controllers/gameController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.post('/', requireAuth, createGame);
router.get('/mine', requireAuth, listMyGames);

export default router;
