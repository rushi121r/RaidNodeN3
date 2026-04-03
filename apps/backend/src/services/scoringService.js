export function calculateGameStats(frames = []) {
  const strikeCount = frames.filter((f) => f.roll1 === 10).length;
  const spareCount = frames.filter((f) => f.roll1 !== 10 && (f.roll1 || 0) + (f.roll2 || 0) === 10).length;
  const splitCount = frames.filter((f) => (f.roll1 || 0) <= 4 && (f.roll2 || 0) <= 4 && (f.roll1 || 0) + (f.roll2 || 0) < 8).length;
  const totalScore = frames.reduce((sum, frame) => sum + (frame.score || 0), 0);

  return { strikeCount, spareCount, splitCount, totalScore };
}
