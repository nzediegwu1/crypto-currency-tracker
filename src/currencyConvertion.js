import axios from 'axios';

require('dotenv').config();

const { COIN_MARKET_API_KEY, COIN_MARKET_API_BASE } = process.env;

axios.defaults.headers.common = { 'X-CMC_PRO_API_KEY': COIN_MARKET_API_KEY };
axios.defaults.baseURL = COIN_MARKET_API_BASE;

/**
 * @desc Retrieves currency rates for coin vs USD, EUR, GBP
 *
 * @param {Number} coinId Id of the coin to convert to fiat
 * @returns {Promise} To return an array of the fiat currency conversions
 */
export default async function getCurrencyRates(coinId) {
  const coinToFiat = currency =>
    axios
      .get(`/v1/tools/price-conversion?id=${coinId}&amount=1&convert=${currency}`)
      .then(({ data: { data } }) => data.quote[currency].price);
  return Promise.all([coinToFiat('USD'), coinToFiat('EUR'), coinToFiat('GBP')]);
}
