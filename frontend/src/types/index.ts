export interface Transaction {
  hash: string;
  timestamp: number;
  amount:string;
  assetPriceUSD:string;
  from: string;
  to: string;
  value: string;
  gasUsed: string;
}

export interface WalletStats {
  totalVolume: string;
  transactionCount: number;
}

export interface ChartData {
  date: string;
  volume: number;
}