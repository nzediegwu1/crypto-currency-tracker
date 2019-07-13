const { commonProperties } = require('../migrationSchema');

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('BitcoinRates', commonProperties(Sequelize)),
  down: queryInterface => queryInterface.dropTable('BitcoinRates'),
};
