import Transaction from "../models/Transaction.js";
import aaveService from "./aaveService.js";

class TransactionService {
  async getTransactions(address) {
    try {
      let transactions = await Transaction.find({ walletAddress: address })
        .sort({ timestamp: -1 })
        .limit(100);

      if (transactions.length === 0) {
        const aaveTransactions = await aaveService.fetchTransactions(address);
        transactions = await Transaction.insertMany(
          aaveTransactions.map((tx) => ({
            ...tx,
            walletAddress: address,
          }))
        );
      }
      return transactions;
    } catch (error) {
      throw new Error(`Transaction Service Error: ${error.message}`);
    }
  }

  async getStats(address) {
    try {
      const transactions = await Transaction.find({ walletAddress: address });
      return {
        totalVolume: transactions.reduce((sum, tx) => {
          return sum + parseFloat(tx.amount * tx.assetPriceUSD);
        }, 0),
        transactionCount: transactions.length,
      };
    } catch (error) {
      throw new Error(`Stats Service Error: ${error.message}`);
    }
  }
}

const transactionService = new TransactionService();
export default transactionService;