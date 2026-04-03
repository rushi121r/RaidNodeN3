import { useState } from 'react';
import { api } from '../api/client';
import FrameEntryGrid from '../components/FrameEntryGrid';

const initialFrames = Array.from({ length: 10 }, (_, index) => ({ frameNumber: index + 1, score: 0 }));

export default function GameEntryPage() {
  const [frames, setFrames] = useState(initialFrames);
  const [message, setMessage] = useState('');

  const saveGame = async () => {
    await api.post('/games', { frames, source: 'MANUAL' });
    setMessage('Game saved successfully.');
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Frame-by-Frame Game Entry</h2>
      <FrameEntryGrid frames={frames} setFrames={setFrames} />
      <button className="rounded bg-lane-neon px-4 py-2 font-semibold text-black" onClick={saveGame}>
        Save Game
      </button>
      {message && <p className="text-lane-accent">{message}</p>}
    </div>
  );
}
