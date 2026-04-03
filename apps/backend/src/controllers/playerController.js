import { Game } from '../models/Game.js';
import { User } from '../models/User.js';

export async function getMyProfile(req, res) {
  const player = await User.findById(req.user._id).populate('bowlingCenter');
  const games = await Game.find({ player: req.user._id });

  const totalGames = games.length || 1;
  const totalScore = games.reduce((sum, game) => sum + game.totalScore, 0);
  const totalStrikes = games.reduce((sum, game) => sum + game.strikeCount, 0);
  const totalSpares = games.reduce((sum, game) => sum + game.spareCount, 0);
  const totalSplits = games.reduce((sum, game) => sum + game.splitCount, 0);

  return res.json({
    player,
    stats: {
      averageScore: Number((totalScore / totalGames).toFixed(1)),
      strikePct: Number(((totalStrikes / (totalGames * 12)) * 100).toFixed(1)),
      sparePct: Number(((totalSpares / (totalGames * 10)) * 100).toFixed(1)),
      splitPct: Number(((totalSplits / (totalGames * 10)) * 100).toFixed(1)),
      totalGames
    }
  });
}
