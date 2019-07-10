import { common } from '.';

export default (sequelize, DataTypes) => sequelize.define('EtheriumRates', common(DataTypes));
