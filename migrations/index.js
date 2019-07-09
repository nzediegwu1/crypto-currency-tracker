exports.commonProperties = Sequelize => ({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  usd: Sequelize.INTEGER,
  eur: Sequelize.INTEGER,
  gbp: Sequelize.INTEGER,
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE,
  },
});
