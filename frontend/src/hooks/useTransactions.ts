import { useState, useEffect } from 'react';

interface Transaction {
  id: string;
  timestamp: string;
  amount: string;
  type: string;
}

interface TransactionsResponse {
  transactions: Transaction[];
  totalVolume: string;
  transactionCount: number;
}

export const useTransactions = (address: string) => {
  const [data, setData] = useState<TransactionsResponse>({
    transactions: [],
    totalVolume: '0',
    transactionCount: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!address) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/wallet/${address}`);
        if (!response.ok) {
          throw new Error('Failed to fetch transactions');
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [address]);

  return { ...data, isLoading, error };
};