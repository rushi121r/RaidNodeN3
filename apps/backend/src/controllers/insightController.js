import { Game } from '../models/Game.js';

export async function getAiInsights(req, res) {
  const latestGames = await Game.find({ player: req.user._id }).sort({ playedAt: -1 }).limit(10);

  if (!latestGames.length) {
    return res.json({ tips: ['Log at least 3 games to unlock AI coaching insights.'] });
  }

  const avg = latestGames.reduce((sum, game) => sum + game.totalScore, 0) / latestGames.length;
  const strikeRate = latestGames.reduce((sum, game) => sum + game.strikeCount, 0) / (latestGames.length * 10);
  const spareRate = latestGames.reduce((sum, game) => sum + game.spareCount, 0) / (latestGames.length * 10);

  const tips = [
    strikeRate < 0.35 ? 'Focus on entry angle drills to increase strike carry.' : 'Great strike consistency. Maintain your tempo.',
    spareRate < 0.5 ? 'Practice 7-pin and 10-pin spare routines with single-pin targeting.' : 'Your spare conversion is a strength.',
    avg < 170 ? 'Improve lane transition reads in frame 6 onward to avoid late game drops.' : 'Solid scoring pace. Aim for cleaner tenth frames.'
  ];

  return res.json({ average: Number(avg.toFixed(1)), tips });
}
