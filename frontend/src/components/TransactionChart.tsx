import { useWalletData } from '../hooks/useWalletData';

interface TransactionChartProps {
  walletAddress: string;
}

export default function TransactionChart({ walletAddress }: TransactionChartProps) {
  const { chartData, loading, error } = useWalletData(walletAddress);

  if (loading) return <div>Loading chart...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!chartData?.length) return <div>No chart data available</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Transaction Volume Over Time</h2>
      {/* TODO: Implement chart using your preferred charting library */}
      <div className="h-64 bg-gray-100 flex items-center justify-center">
        <p>Chart will be implemented here</p>
      </div>
    </div>
  );
} 