import { useWalletData } from '../hooks/useWalletData';

interface StatsDisplayProps {
  walletAddress: string;
}

export default function StatsDisplay({ walletAddress }: StatsDisplayProps) {
  const { stats, loading, error } = useWalletData(walletAddress);

  if (loading) return <div>Loading stats...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!stats) return <div>No stats available</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Wallet Statistics</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-600">Total Volume</p>
          <p className="text-2xl font-bold">{stats.totalVolume} ETH</p>
        </div>
        <div>
          <p className="text-gray-600">Transactions</p>
          <p className="text-2xl font-bold">{stats.transactionCount}</p>
        </div>
      </div>
    </div>
  );
} 