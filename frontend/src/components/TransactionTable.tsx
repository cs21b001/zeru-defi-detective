import { useWalletData } from '../hooks/useWalletData';

interface TransactionTableProps {
  walletAddress: string;
}

export default function TransactionTable({ walletAddress }: TransactionTableProps) {
  const { transactions, loading, error } = useWalletData(walletAddress);

  if (loading) return <div>Loading transactions...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!transactions?.length) return <div>No transactions found</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2">Hash</th>
            <th className="px-4 py-2">Time</th>
            <th className="px-4 py-2">From</th>
            <th className="px-4 py-2">To</th>
            <th className="px-4 py-2">Value</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.hash} className="border-t">
              <td className="px-4 py-2 font-mono text-sm">{tx.hash.slice(0, 10)}...</td>
              <td className="px-4 py-2">{new Date(tx.timestamp * 1000).toLocaleString()}</td>
              <td className="px-4 py-2 font-mono text-sm">{tx.from.slice(0, 8)}...</td>
              <td className="px-4 py-2 font-mono text-sm">{tx.to.slice(0, 8)}...</td>
              <td className="px-4 py-2">{tx.value} ETH</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 