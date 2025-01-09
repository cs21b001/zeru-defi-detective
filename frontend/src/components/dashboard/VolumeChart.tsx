import { 
    LineChart, 
    Line, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer 
  } from 'recharts';
  
  interface ChartDataPoint {
    date: string;
    volume: number;
  }
  
  interface VolumeChartProps {
    data: ChartDataPoint[];
  }
  
  export const VolumeChart = ({ data }: VolumeChartProps) => {
    if (!data || data.length === 0) {
      return <div>No chart data available</div>;
    }
  
    return (
      <div className="h-[400px] w-full bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Transaction Volume Over Time</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tickFormatter={(value) => new Date(value).toLocaleDateString()}
            />
            <YAxis />
            <Tooltip 
              labelFormatter={(value) => new Date(value).toLocaleDateString()}
              formatter={(value) => [`${value} ETH`, 'Volume']}
            />
            <Line
              type="monotone"
              dataKey="volume"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };