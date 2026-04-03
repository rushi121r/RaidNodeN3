import { useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';
import { api } from '../api/client';

const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000');

export default function TournamentPage() {
  const [tournaments, setTournaments] = useState([]);
  const [liveEvent, setLiveEvent] = useState(null);

  useEffect(() => {
    api.get('/tournaments').then(({ data }) => setTournaments(data));
  }, []);

  useEffect(() => {
    socket.on('live_score_update', (payload) => setLiveEvent(payload));
    return () => socket.off('live_score_update');
  }, []);

  const upcoming = useMemo(() => tournaments.filter((t) => t.status !== 'COMPLETED'), [tournaments]);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Tournament & Auction Hub</h2>
      <div className="grid gap-3 md:grid-cols-2">
        {upcoming.map((event) => (
          <article key={event._id} className="rounded-xl border border-lane-neon/30 bg-lane-card/80 p-4">
            <h3 className="text-lg font-semibold">{event.name}</h3>
            <p className="text-sm text-slate-300">{event.city}</p>
            <p className="text-sm">UPI: {event.upiVpa || 'Add in admin panel'}</p>
          </article>
        ))}
      </div>
      {liveEvent && (
        <div className="rounded border border-lane-accent bg-slate-900/70 p-3">
          Live: {liveEvent.playerName} scored {liveEvent.totalScore}
        </div>
      )}
    </div>
  );
}
