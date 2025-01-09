interface StatsDisplayProps {
    totalVolume: string;
    transactionCount: number;
  }
  
  export const StatsDisplay = ({ totalVolume, transactionCount }: StatsDisplayProps) => {
    return (
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold">Total Volume</h3>
          <p className="text-2xl">{totalVolume}</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold">Total Transactions</h3>
          <p className="text-2xl">{transactionCount}</p>
        </div>
      </div>
    );
  };