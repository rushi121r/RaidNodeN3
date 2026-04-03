export default function LeaderboardTable({ rows = [] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-lane-neon/30 bg-lane-card/80">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-slate-900/60 text-slate-200">
          <tr>
            <th className="px-3 py-2">Rank</th>
            <th className="px-3 py-2">Player</th>
            <th className="px-3 py-2">City</th>
            <th className="px-3 py-2">Avg</th>
            <th className="px-3 py-2">Best</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row._id} className="border-t border-slate-800">
              <td className="px-3 py-2">#{row.rank}</td>
              <td className="px-3 py-2">{row.name}</td>
              <td className="px-3 py-2">{row.city}</td>
              <td className="px-3 py-2">{Math.round(row.averageScore)}</td>
              <td className="px-3 py-2">{row.bestScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
