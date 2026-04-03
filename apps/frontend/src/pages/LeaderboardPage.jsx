import { useEffect, useState } from 'react';
import { api } from '../api/client';
import LeaderboardTable from '../components/LeaderboardTable';

export default function LeaderboardPage() {
  const [range, setRange] = useState('weekly');
  const [city, setCity] = useState('');
  const [rows, setRows] = useState([]);

  useEffect(() => {
    api.get('/leaderboard', { params: { range, city: city || undefined } }).then(({ data }) => setRows(data));
  }, [range, city]);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">India Leaderboard</h2>
      <div className="flex flex-wrap gap-2">
        {['daily', 'weekly', 'monthly'].map((value) => (
          <button
            key={value}
            onClick={() => setRange(value)}
            className={`rounded px-3 py-1 ${range === value ? 'bg-lane-neon text-black' : 'bg-slate-800'}`}
          >
            {value}
          </button>
        ))}
        <input
          className="rounded bg-slate-800 px-3 py-1"
          placeholder="Filter city (e.g. Surat)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <LeaderboardTable rows={rows} />
    </div>
  );
}
