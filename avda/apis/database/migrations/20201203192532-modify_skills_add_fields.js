'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'Skills',
      'order', {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    }
    )
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Skills', 'order'),
    ]);
  }
};
