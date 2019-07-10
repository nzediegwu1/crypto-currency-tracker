import convertCoin from './coinConverter';
import db from './models';
import { logError } from './util';

const coins = [{ id: 1, model: db.BitcoinRates }, { id: 1027, model: db.EtheriumRates }];

/**
 * @desc Executes convertCoin function and save result to db
 *
 * @param {Object} coin Coin object having properties: id and model
 * @returns {void}
 */
async function executeConversions(coin) {
  try {
    const [usd, eur, gbp] = await convertCoin(coin.id);
    await coin.model.create({ usd, eur, gbp });
  } catch (error) {
    logError(error, { coin: coin.id, errorResponse: error.response });
  }
}

export default () => {
  coins.forEach(coin => executeConversions(coin));
};
