const { commonProperties } = require('../migrationSchema');

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('EtheriumRates', commonProperties(Sequelize)),
  down: queryInterface => queryInterface.dropTable('EtheriumRates'),
};
