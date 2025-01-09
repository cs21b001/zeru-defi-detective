import { Transaction, WalletStats, ChartData } from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function getWalletTransactions(address: string): Promise<Transaction[]> {
  console.log('Fetching transactions for address:', address);
  try {
    const response = await fetch(`${API_BASE_URL}/api/wallet/${address}/transactions`);
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error response:', errorData);
      throw new Error(`Failed to fetch transactions: ${errorData.error || response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Transactions data:', data);
    return data;
  } catch (error) {
    console.error('Transaction fetch error:', error);
    throw error;
  }
}

export async function getWalletStats(address: string): Promise<WalletStats> {
  console.log('Fetching stats for address:', address);
  try {
    const response = await fetch(`${API_BASE_URL}/api/wallet/${address}/stats`);
    console.log('Stats response status:', response.status);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Stats error response:', errorData);
      throw new Error(`Failed to fetch stats: ${errorData.error || response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Stats data:', data);
    return data;
  } catch (error) {
    console.error('Stats fetch error:', error);
    throw error;
  }
}

export async function getTransactionChart(address: string): Promise<ChartData[]> {
  console.log('Generating chart data for address:', address);
  try {
    const transactions = await getWalletTransactions(address);
    const chartData = transactions.map(tx => ({
      date: new Date(tx.timestamp * 1000).toISOString(),
      volume: parseFloat(tx.amount) * parseFloat(tx.assetPriceUSD)
    }));
    console.log('Generated chart data:', chartData);
    return chartData;
  } catch (error) {
    console.error('Chart data generation error:', error);
    throw error;
  }
}