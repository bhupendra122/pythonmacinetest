'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'JobLanguages',
      'level', {
      allowNull: true,
      type: Sequelize.STRING,
    }
    )
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('JobLanguages', 'level'),
    ]);
  }
};
