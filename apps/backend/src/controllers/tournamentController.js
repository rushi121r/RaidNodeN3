import { z } from 'zod';
import { Tournament } from '../models/Tournament.js';

const createTournamentSchema = z.object({
  name: z.string().min(3),
  city: z.string().min(2),
  center: z.string(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  entryFeeInr: z.number().min(0).default(0),
  upiVpa: z.string().optional()
});

export async function createTournament(req, res) {
  const parsed = createTournamentSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: 'Invalid tournament payload' });
  }

  const tournament = await Tournament.create({
    ...parsed.data,
    createdBy: req.user._id,
    status: 'UPCOMING'
  });

  return res.status(201).json(tournament);
}

export async function listTournaments(req, res) {
  const tournaments = await Tournament.find().populate('center createdBy').sort({ startDate: 1 });
  return res.json(tournaments);
}

export async function placeBid(req, res) {
  const schema = z.object({ player: z.string(), teamName: z.string(), amount: z.number().min(1) });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: 'Invalid bid payload' });
  }

  const tournament = await Tournament.findById(req.params.id);
  if (!tournament) {
    return res.status(404).json({ message: 'Tournament not found' });
  }

  tournament.bids.push(parsed.data);
  await tournament.save();
  return res.status(201).json(tournament);
}
