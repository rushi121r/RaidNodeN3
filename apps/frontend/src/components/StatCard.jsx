export default function StatCard({ label, value, helper }) {
  return (
    <div className="rounded-xl border border-lane-neon/30 bg-lane-card/80 p-4 shadow-neon">
      <p className="text-sm text-slate-300">{label}</p>
      <p className="mt-2 text-3xl font-bold text-lane-accent">{value}</p>
      {helper ? <p className="text-xs text-slate-400">{helper}</p> : null}
    </div>
  );
}
