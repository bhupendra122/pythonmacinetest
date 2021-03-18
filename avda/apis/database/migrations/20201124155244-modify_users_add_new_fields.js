'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'Users',
      'is_verified', {
      allowNull: true,
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    }
    ),
      queryInterface.addColumn(
        'Users',
        'code', {
        allowNull: true,
        type: Sequelize.INTEGER
      }
      )
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Users', 'is_verified'),
      queryInterface.removeColumn('Users', 'code'),
    ]);
  }
};
