import { useState } from 'react';
import { api } from '../api/client';

export default function AdminPanelPage() {
  const [center, setCenter] = useState({ name: '', city: '', address: '' });
  const [result, setResult] = useState('');

  const addCenter = async (event) => {
    event.preventDefault();
    const { data } = await api.post('/centers', center);
    setResult(`Center created: ${data.name}`);
    setCenter({ name: '', city: '', address: '' });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Admin Control Panel</h2>
      <form onSubmit={addCenter} className="max-w-xl space-y-2 rounded-xl border border-lane-neon/30 bg-lane-card/80 p-4">
        <input
          className="w-full rounded bg-slate-800 p-2"
          placeholder="Center Name"
          value={center.name}
          onChange={(e) => setCenter({ ...center, name: e.target.value })}
        />
        <input
          className="w-full rounded bg-slate-800 p-2"
          placeholder="City"
          value={center.city}
          onChange={(e) => setCenter({ ...center, city: e.target.value })}
        />
        <input
          className="w-full rounded bg-slate-800 p-2"
          placeholder="Address"
          value={center.address}
          onChange={(e) => setCenter({ ...center, address: e.target.value })}
        />
        <button className="rounded bg-lane-neon px-4 py-2 font-semibold text-black">Create Center</button>
      </form>
      {result && <p className="text-lane-accent">{result}</p>}
    </div>
  );
}
