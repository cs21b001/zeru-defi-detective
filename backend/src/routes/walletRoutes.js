import express from 'express';
import transactionService from "../services/transactionService.js";

const router = express.Router();

router.get('/:address/stats', async (req, res) => {
  try {
    const stats = await transactionService.getStats(req.params.address);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:address/transactions', async (req, res) => {
  try {
    const transactions = await transactionService.getTransactions(req.params.address);
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;