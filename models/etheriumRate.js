import { baseProperties } from '.';

export default (sequelize, DataTypes) => sequelize.define('etheriumRates', baseProperties(DataTypes));
