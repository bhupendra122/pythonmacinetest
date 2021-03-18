'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Jobs', 'language'),
      queryInterface.removeColumn('Jobs', 'benefits'),
    ]);

  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([]);
  }
};
