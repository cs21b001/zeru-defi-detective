import { useState, useEffect } from 'react';
import { Transaction, WalletStats, ChartData } from '../types';
import { getWalletTransactions, getWalletStats, getTransactionChart } from '../utils/api';

export function useWalletData(address: string) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [stats, setStats] = useState<WalletStats | null>(null);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!address) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [txs, statsData, chart] = await Promise.all([
          getWalletTransactions(address),
          getWalletStats(address),
          getTransactionChart(address)
        ]);
        
        setTransactions(txs);
        setStats(statsData);
        setChartData(chart);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [address]);

  return { transactions, stats, chartData, loading, error };
}