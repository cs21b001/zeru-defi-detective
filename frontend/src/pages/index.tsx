import { useState } from 'react';
import {SearchBar} from '../components/common/SearchBar';
import TransactionTable from '../components/TransactionTable';
import StatsDisplay from '../components/StatsDisplay';
import TransactionChart from '../components/TransactionChart';

export default function Home() {
  const [walletAddress, setWalletAddress] = useState('');

  const handleSearch = (address: string) => {
    setWalletAddress(address);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Wallet Dashboard</h1>
        
        <SearchBar onSearch={handleSearch} />
        
        {walletAddress && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <StatsDisplay walletAddress={walletAddress} />
              <TransactionChart walletAddress={walletAddress} />
            </div>
            
            <TransactionTable walletAddress={walletAddress} />
          </>
        )}
      </div>
    </main>
  );
}