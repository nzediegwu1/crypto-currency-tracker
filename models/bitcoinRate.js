import { baseProperties } from '.';

export default (sequelize, DataTypes) => sequelize.define('bitcoinRates', baseProperties(DataTypes));
