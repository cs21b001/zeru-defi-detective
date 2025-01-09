import { useState, useEffect } from 'react';

interface ChartDataPoint {
  date: string;
  volume: number;
}

export const useChartData = (address: string) => {
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChartData = async () => {
      if (!address) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/wallet/${address}`);
        if (!response.ok) {
          throw new Error('Failed to fetch chart data');
        }

        const data = await response.json();
        setChartData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchChartData();
  }, [address]);

  return { chartData, isLoading, error };
};