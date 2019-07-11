import express from 'express';

const router = express.Router();

router.get('/bitcoin', (req, res) => {});
router.get('/etherium', (req, res) => {});
router.get('/', (req, res) => res.status(200).json({ message: 'welcome to crypto-currency-tracker api' }));

export default router