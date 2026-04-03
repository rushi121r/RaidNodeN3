import { z } from 'zod';
import { BowlingCenter } from '../models/BowlingCenter.js';

const createCenterSchema = z.object({
  name: z.string().min(3),
  city: z.string().min(2),
  address: z.string().optional(),
  lanes: z.number().min(1).max(100).default(8)
});

export async function createCenter(req, res) {
  const parsed = createCenterSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: 'Invalid center payload' });
  }

  const center = await BowlingCenter.create({ ...parsed.data, manager: req.user._id });
  return res.status(201).json(center);
}

export async function listCenters(req, res) {
  const centers = await BowlingCenter.find().populate('manager').sort({ city: 1, name: 1 });
  return res.json(centers);
}
