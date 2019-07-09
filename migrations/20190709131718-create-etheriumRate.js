const { commonProperties } = require('.');

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('etheriumRates', commonProperties(Sequelize)),
  down: queryInterface => queryInterface.dropTable('etheriumRates'),
};
