import { z } from 'zod';
import { Game } from '../models/Game.js';
import { calculateGameStats } from '../services/scoringService.js';

const frameSchema = z.object({
  frameNumber: z.number().min(1).max(10),
  roll1: z.number().min(0).max(10).optional(),
  roll2: z.number().min(0).max(10).optional(),
  roll3: z.number().min(0).max(10).optional(),
  score: z.number().min(0).max(30)
});

const createGameSchema = z.object({
  center: z.string().optional(),
  tournament: z.string().optional(),
  playedAt: z.string().datetime().optional(),
  source: z.enum(['MANUAL', 'SYSTEM_IMPORT']).default('MANUAL'),
  frames: z.array(frameSchema).length(10)
});

export async function createGame(req, res) {
  const parsed = createGameSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: 'Invalid game payload', errors: parsed.error.flatten() });
  }

  const { frames, ...rest } = parsed.data;
  const stats = calculateGameStats(frames);

  const game = await Game.create({
    ...rest,
    player: req.user._id,
    playedAt: rest.playedAt ? new Date(rest.playedAt) : new Date(),
    frames,
    ...stats
  });

  return res.status(201).json(game);
}

export async function listMyGames(req, res) {
  const games = await Game.find({ player: req.user._id })
    .populate('center tournament')
    .sort({ playedAt: -1 })
    .limit(100);
  return res.json(games);
}
