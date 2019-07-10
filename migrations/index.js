exports.commonProperties = Sequelize => ({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  usd: Sequelize.DOUBLE,
  eur: Sequelize.DOUBLE,
  gbp: Sequelize.DOUBLE,
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE,
  },
});
