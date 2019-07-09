export default (sequelize, DataTypes) => {
  const ErrorLogs = sequelize.define('errorLogs', {
    coin: { type: DataTypes.STRING(5), validate: { isIn: [['eth', 'btc']] } },
    error: DataTypes.STRING,
  });
  return ErrorLogs;
};
