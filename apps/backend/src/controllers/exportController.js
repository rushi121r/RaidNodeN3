import { Game } from '../models/Game.js';

export async function exportMyGamesCsv(req, res) {
  const games = await Game.find({ player: req.user._id }).sort({ playedAt: -1 });
  const header = 'date,totalScore,strikes,spares,splits';
  const rows = games.map((g) =>
    [g.playedAt.toISOString(), g.totalScore, g.strikeCount, g.spareCount, g.splitCount].join(',')
  );

  const csv = [header, ...rows].join('\n');
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="games-export.csv"');
  return res.send(csv);
}
