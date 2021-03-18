'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'Users',
      'verification_code', {
      allowNull: true,
      type: Sequelize.STRING,
    }
    )
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Users', 'verification_code'),
    ]);
  }
};
