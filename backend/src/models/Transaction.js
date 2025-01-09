import { Schema, model } from "mongoose";

const TransactionSchema = new Schema({
  id: String,
  timestamp: Date,
  txHash: String,
  action: String,
  amount: String,
  assetPriceUSD: String,
  reserve: {
    symbol: String,
    decimals: Number,
  },
  walletAddress: String,
});

export default model("Transaction", TransactionSchema);
