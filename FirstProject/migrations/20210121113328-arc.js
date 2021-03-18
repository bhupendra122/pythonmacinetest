module.exports = {
  up: (queryInterface, Sequelize) => {
  return queryInterface.sequelize.transaction(t => {
  return Promise.all([
  queryInterface.addColumn('Users', 'mobileNumber', {
  type: Sequelize.DataTypes.STRING
  }, { transaction: t }),
  queryInterface.addColumn('Users', 'mobileNumber', {
  type: Sequelize.DataTypes.STRING,
  }, { transaction: t })
  ]);
  });
  },
  down: (queryInterface, Sequelize) => {
  return queryInterface.sequelize.transaction(t => {
  return Promise.all([
  queryInterface.removeColumn('Users', 'mobileNumber', { transaction: t }),
  queryInterface.removeColumn('Users', 'mobileNumber', { transaction: t })
  ]);
  });
  }
  };