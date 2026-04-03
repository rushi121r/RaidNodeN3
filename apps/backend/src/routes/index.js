import { Router } from 'express';
import authRoutes from './authRoutes.js';
import playerRoutes from './playerRoutes.js';
import gameRoutes from './gameRoutes.js';
import leaderboardRoutes from './leaderboardRoutes.js';
import tournamentRoutes from './tournamentRoutes.js';
import centerRoutes from './centerRoutes.js';
import notificationRoutes from './notificationRoutes.js';
import exportRoutes from './exportRoutes.js';
import insightRoutes from './insightRoutes.js';

const router = Router();

router.get('/health', (_, res) => res.json({ ok: true, service: 'bowling-api' }));
router.use('/auth', authRoutes);
router.use('/players', playerRoutes);
router.use('/games', gameRoutes);
router.use('/leaderboard', leaderboardRoutes);
router.use('/tournaments', tournamentRoutes);
router.use('/centers', centerRoutes);
router.use('/notifications', notificationRoutes);
router.use('/exports', exportRoutes);
router.use('/insights', insightRoutes);

export default router;
