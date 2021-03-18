'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'Skills',
      'app_skill_id', {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    }
    )
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Skills', 'app_skill_id'),
    ]);
  }
};
