module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('errorLogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      coin: Sequelize.STRING(5),
      error: Sequelize.STRING,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }),
  down: queryInterface => queryInterface.dropTable('errorLogs'),
};
