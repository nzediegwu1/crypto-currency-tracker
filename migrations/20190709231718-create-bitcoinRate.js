const { commonProperties } = require('.');

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('bitcoinRates', commonProperties(Sequelize)),
  down: queryInterface => queryInterface.dropTable('bitcoinRates'),
};
