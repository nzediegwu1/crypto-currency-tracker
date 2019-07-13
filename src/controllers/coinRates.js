import { Op } from 'sequelize';
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
    const { from, to } = req.query;
    let { page = 1, limit = 10 } = req.query;
    const toDate = to ? new Date(to) : new Date();
    const condition = from ? { createdAt: { [Op.between]: [new Date(from), toDate] } } : {};
    page = +page;
    limit = +limit;
    const paginatedResponse = await models[coin]
      .findAndCountAll({ where: condition })
      .then(({ count }) => {
        const pages = Math.ceil(count / limit);
        const offset = page > pages ? (pages - 1) * limit : (page - 1) * limit;
        return models[coin].findAll({
          where: condition,
          attributes: { exclude: ['updatedAt'] },
          offset: Math.abs(offset),
          limit,
          order: [['createdAt', 'DESC']],
        });
      });
    return response(res, 200, success.fetched(coin), {
      result: paginatedResponse,
      metaData: {
        page,
        limit,
        from: from || '',
        to: to || '',
        count: paginatedResponse.length,
      },
    });
  };
}

const coins = new CoinRates();

export default {
  getRates: coin => resolver(coins.getRates(coin)),
};
