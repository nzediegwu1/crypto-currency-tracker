import convertCoin from './currencyConverter';
import db from '../models';

const coins = [{ id: 1, model: db.bitcoinRates }, { id: 1027, model: db.etheriumRates }];
const executeConversions = coin =>
  convertCoin(coin.id)
    .then(([usd, eur, gbp]) => {
      // save object to database
    })
    .catch(({ message }) => {
      // save error message to log table in db
    });

export default () => {
  coins.forEach(coin => executeConversions(coin));
};
