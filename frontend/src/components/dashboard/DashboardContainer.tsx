import { useState } from 'react';
import { SearchBar } from '../common/SearchBar';
import { TransactionHistory } from './TransactionHistory';
import { StatsDisplay } from './StatsDisplay';
import { VolumeChart } from './VolumeChart';
import { useWalletData } from '../../hooks/useWalletData';

export const DashboardContainer = () => {
  const [address, setAddress] = useState('');
  const { transactions, stats, chartData, loading: isLoading, error } = useWalletData(address);

  const handleSearch = (newAddress: string) => {
    setAddress(newAddress);
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <SearchBar onSearch={handleSearch} />
      
      {error && (
        <div className="text-red-500 text-center">{error}</div>
      )}

      {address && !error && (
        <>
          <StatsDisplay 
            totalVolume={stats?.totalVolume || '0'}
            transactionCount={stats?.transactionCount || 0}
          />
          
          <VolumeChart data={chartData} />
          
          <TransactionHistory 
            transactions={transactions}
            isLoading={isLoading}
          />
        </>
      )}
    </div>
  );
};