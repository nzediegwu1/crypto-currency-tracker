import { common } from '.';

export default (sequelize, DataTypes) => sequelize.define('BitcoinRates', common(DataTypes));
