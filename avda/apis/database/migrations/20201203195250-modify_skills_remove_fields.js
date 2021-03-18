'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Skills', 'name'),
    ]);

  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([]);
  }
};
