import { baseProperties } from '.';

export default (sequelize, DataTypes) => {
  const BitcoinRates = sequelize.define('bitcoinRates', baseProperties(DataTypes));
  return BitcoinRates;
};
