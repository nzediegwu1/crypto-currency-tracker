import express from 'express';
import { response } from './helpers';
import { Coins, logs } from './controllers';
import { validateGetRates, handleValidation } from './middlewares/validator';

const router = express.Router();

router.get('/', (req, res) => response(res, 200, 'welcome to crypto-currency-tracker api'));
router.get('/bitcoin', validateGetRates, handleValidation, Coins.getRates('bitcoin'));
router.get('/etherium', validateGetRates, handleValidation, Coins.getRates('etherium'));
router.get('/logs', logs);

export default router;
