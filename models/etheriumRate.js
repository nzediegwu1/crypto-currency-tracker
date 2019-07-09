import { baseProperties } from '.';

export default (sequelize, DataTypes) => {
  const EtheriumRates = sequelize.define('etheriumRates', baseProperties(DataTypes));
  return EtheriumRates;
};
