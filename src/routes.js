import express from 'express';
import Coins from './controllers/coinRates';

const router = express.Router();

router.get('/bitcoin', Coins.getRates('bitcoin'));
router.get('/etherium', Coins.getRates('etherium'));
router.get('/', (req, res) =>
  res.status(200).json({ message: 'welcome to crypto-currency-tracker api' }));

export default router;
