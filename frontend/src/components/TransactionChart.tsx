import { useWalletData } from '../hooks/useWalletData';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
} from 'chart.js';

// Register the necessary components
ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

interface TransactionChartProps {
  walletAddress: string;
}

export default function TransactionChart({ walletAddress }: TransactionChartProps) {
  const { chartData, loading, error } = useWalletData(walletAddress);

  if (loading) return <div>Loading chart...</div>;
  if (error) return <div>Error: {error}</div>;

  // Create a new variable for display
  const displayChartData = chartData?.length ? chartData : [
    { date: new Date(Date.now() - 86400000).toISOString(), volume: 1.5 }, // 1 day ago
    { date: new Date(Date.now() - 172800000).toISOString(), volume: 2.0 }, // 2 days ago
  ];

  // Prepare data for the chart
  const data = {
    labels: displayChartData.map(data => new Date(data.date).toLocaleDateString()), // Format date for labels
    datasets: [
      {
        label: 'Transaction Volume (ETH)',
        data: displayChartData.map(data => data.volume),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Transaction Volume Over Time</h2>
      {chartData?.length ? null : (
        <p className="text-red-500 mb-4">Note: The displayed data is dummy data.</p>
      )}
      <div className="h-64">
        <Line data={data} />
      </div>
    </div>
  );
}