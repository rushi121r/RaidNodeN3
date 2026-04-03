import { useEffect, useState } from 'react';
import { api } from '../api/client';
import PerformanceChart from '../components/PerformanceChart';
import StatCard from '../components/StatCard';

export default function DashboardPage() {
  const [profile, setProfile] = useState(null);
  const [games, setGames] = useState([]);
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    async function load() {
      const [{ data: profileData }, { data: gameData }, { data: insightData }] = await Promise.all([
        api.get('/players/me'),
        api.get('/games/mine'),
        api.get('/insights/me')
      ]);
      setProfile(profileData);
      setGames(gameData.slice(0, 8).reverse());
      setInsights(insightData.tips || []);
    }

    load();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Player Dashboard</h2>
      {profile && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Average" value={profile.stats.averageScore} helper="Auto-calculated" />
          <StatCard label="Strike %" value={`${profile.stats.strikePct}%`} />
          <StatCard label="Spare %" value={`${profile.stats.sparePct}%`} />
          <StatCard label="Split %" value={`${profile.stats.splitPct}%`} />
        </div>
      )}

      <PerformanceChart games={games} />
      <section className="rounded-xl border border-lane-neon/30 bg-lane-card/80 p-4">
        <h3 className="mb-2 text-lg font-semibold">AI Performance Insights</h3>
        <ul className="list-disc space-y-1 pl-5 text-sm text-slate-200">
          {insights.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
