import { Transaction } from '../../types';

interface TransactionHistoryProps {
  transactions: Transaction[];
  isLoading: boolean;
}

export const TransactionHistory = ({ transactions, isLoading }: TransactionHistoryProps) => {
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr>
            <th>Hash</th>
            <th>Time</th>
            <th>From</th>
            <th>To</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.hash}>
              <td>{tx.hash.slice(0, 10)}...</td>
              <td>{new Date(tx.timestamp * 1000).toLocaleString()}</td>
              <td>{tx.from.slice(0, 8)}...</td>
              <td>{tx.to.slice(0, 8)}...</td>
              <td>{tx.value} ETH</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};