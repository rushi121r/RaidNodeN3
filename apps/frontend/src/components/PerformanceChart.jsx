import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function PerformanceChart({ games = [] }) {
  const chartData = {
    labels: games.map((_, i) => `G${i + 1}`),
    datasets: [
      {
        label: 'Score Trend',
        data: games.map((g) => g.totalScore),
        borderColor: '#22d3ee',
        backgroundColor: '#9f6cff',
        tension: 0.35
      }
    ]
  };

  return (
    <div className="rounded-xl border border-lane-neon/30 bg-lane-card/80 p-4">
      <Line data={chartData} />
    </div>
  );
}
