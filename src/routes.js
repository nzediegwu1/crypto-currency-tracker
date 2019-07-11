import express from 'express';
import Coins from './controllers/coinRates';
import { validateGetRates, handleValidation } from './middlewares/validator';

const router = express.Router();

router.get('/bitcoin', validateGetRates, handleValidation, Coins.getRates('bitcoin'));
router.get('/etherium', validateGetRates, handleValidation, Coins.getRates('etherium'));
router.get('/', (req, res) =>
  res.status(200).json({ message: 'welcome to crypto-currency-tracker api' }));

export default router;
