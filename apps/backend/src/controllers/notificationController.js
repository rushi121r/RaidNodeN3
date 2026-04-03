import { z } from 'zod';

const notifySchema = z.object({
  channel: z.enum(['EMAIL', 'WHATSAPP']),
  recipient: z.string().min(4),
  message: z.string().min(5)
});

export async function sendNotification(req, res) {
  const parsed = notifySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: 'Invalid notification payload' });
  }

  return res.json({
    status: 'queued',
    integration: 'stub',
    ...parsed.data
  });
}
