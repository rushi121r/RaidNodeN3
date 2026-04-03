import { Router } from 'express';
import { createTournament, listTournaments, placeBid } from '../controllers/tournamentController.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

router.get('/', listTournaments);
router.post('/', requireAuth, requireRole('ADMIN'), createTournament);
router.post('/:id/bids', requireAuth, requireRole('ADMIN'), placeBid);

export default router;
