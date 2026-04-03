import { Game } from '../models/Game.js';

function getRange(range) {
  const now = new Date();
  const start = new Date(now);
  if (range === 'daily') {
    start.setHours(0, 0, 0, 0);
  } else if (range === 'weekly') {
    const day = now.getDay();
    start.setDate(now.getDate() - day);
    start.setHours(0, 0, 0, 0);
  } else if (range === 'monthly') {
    start.setDate(1);
    start.setHours(0, 0, 0, 0);
  }
  return start;
}

export async function getLeaderboard(req, res) {
  const range = req.query.range || 'weekly';
  const city = req.query.city;
  const startDate = getRange(range);

  const pipeline = [
    { $match: { playedAt: { $gte: startDate } } },
    {
      $lookup: {
        from: 'users',
        localField: 'player',
        foreignField: '_id',
        as: 'player'
      }
    },
    { $unwind: '$player' }
  ];

  if (city) {
    pipeline.push({ $match: { 'player.city': city } });
  }

  pipeline.push(
    {
      $group: {
        _id: '$player._id',
        name: { $first: '$player.name' },
        city: { $first: '$player.city' },
        averageScore: { $avg: '$totalScore' },
        bestScore: { $max: '$totalScore' },
        gamesPlayed: { $sum: 1 }
      }
    },
    { $sort: { averageScore: -1, bestScore: -1 } },
    { $limit: 50 }
  );

  const data = await Game.aggregate(pipeline);
  return res.json(data.map((entry, index) => ({ rank: index + 1, ...entry })));
}
