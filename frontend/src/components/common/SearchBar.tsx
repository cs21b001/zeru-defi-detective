import { useState } from 'react';

interface SearchBarProps {
  onSearch: (address: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [address, setAddress] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(address);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="flex gap-2">
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter wallet address"
          className="flex-1 p-2 border rounded-lg"
        />
        <button 
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Search
        </button>
      </div>
    </form>
  );
};
