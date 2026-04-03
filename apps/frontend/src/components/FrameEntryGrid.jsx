export default function FrameEntryGrid({ frames, setFrames }) {
  const updateFrame = (index, key, value) => {
    const next = [...frames];
    next[index] = { ...next[index], [key]: Number(value || 0) };
    setFrames(next);
  };

  return (
    <div className="grid gap-3 md:grid-cols-2">
      {frames.map((frame, index) => (
        <div key={frame.frameNumber} className="rounded-lg border border-slate-700 bg-slate-900/50 p-3">
          <p className="font-semibold text-lane-accent">Frame {frame.frameNumber}</p>
          <div className="mt-2 grid grid-cols-4 gap-2">
            {['roll1', 'roll2', 'roll3', 'score'].map((field) => (
              <input
                key={field}
                type="number"
                min="0"
                max="30"
                value={frame[field] || ''}
                onChange={(e) => updateFrame(index, field, e.target.value)}
                placeholder={field}
                className="rounded bg-slate-800 px-2 py-1 text-xs"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
