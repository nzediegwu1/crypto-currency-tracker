import convertCoin from './currencyConverter';

const coins = [{ id: 1, model: 'bitcoin' }, { id: 1027, model: 'etherium' }];
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
