import db from '../models';
import { resolver, response } from '../helpers';
import { success } from '../messages';

const models = {
  bitcoin: db.BitcoinRates,
  etherium: db.EtheriumRates,
};

/**
 * @desc Handles http requests for supported cryptocurrency rates
 *
 * @class CoinRates
 */
class CoinRates {
  /**
   * @desc Endpoint for getting coin rates for a given coin
   *
   * @param {String} coin coin to be retrieved: bitcoin || etherium
   * @returns {Function} Request handler: processes the request and returns success response
   */
  getRates = coin => async (req, res) => {
    const data = await models[coin].findAll();
    return response(res, 200, success.fetched(coin), data);
  };
}

const coins = new CoinRates();

export default {
  getRates: coin => resolver(coins.getRates(coin)),
};
