import { useWalletData } from '../hooks/useWalletData';

interface TransactionTableProps {
  walletAddress: string;
}

export default function TransactionTable({ walletAddress }: TransactionTableProps) {
  const { transactions, loading, error } = useWalletData(walletAddress);

  if (loading) return <div>Loading transactions...</div>;
  if (error) return <div>Error: {error}</div>;

  // Create a new variable for display
  const displayTransactions = transactions?.length ? transactions : [
    {
      hash: '0x12d9c5fd9e271d2ccc3d8697ff9d2d139d534108',
      timestamp: Date.now() / 1000, // Current time
      from: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd',
      to: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd',
      value: 1.5,
    },
    {
      hash: '0xabcdefabcdefabcdefabcdefabcdefabcdef12345678',
      timestamp: Date.now() / 1000 - 86400, // 1 day ago
      from: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd',
      to: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd',
      value: 2.0,
    },
  ];

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
          {displayTransactions.map((tx) => (
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
      {transactions?.length ? null : (
        <p className="text-red-500 mb-4">Note: The displayed data is dummy data.</p>
      )}
    </div>
  );
}