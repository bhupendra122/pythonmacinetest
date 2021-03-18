'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Companies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
      },
      name: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      industry: {
        type: Sequelize.STRING
      },
      founded: {
        type: Sequelize.INTEGER
      },
      hiring_manager: {
        type: Sequelize.STRING
      },
      logo: {
        type: Sequelize.STRING
      },
      position: {
        type: Sequelize.STRING
      },
      about_us: {
        type: Sequelize.TEXT
      },
      mission: {
        type: Sequelize.TEXT
      },
      vision: {
        type: Sequelize.TEXT
      },
      value: {
        type: Sequelize.TEXT
      },
      company_type: {
        type: Sequelize.STRING
      },
      company_culture: {
        type: Sequelize.STRING
      },
      employees: {
        type: Sequelize.STRING
      },
      veteran: {
        type: Sequelize.BOOLEAN
      },
      website: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Companies');
  }
};