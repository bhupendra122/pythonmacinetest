'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('AdditionalWorkInformations', {
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
      desired_salary: {
        type: Sequelize.INTEGER
      },
      start_range: {
        type: Sequelize.INTEGER
      },
      end_range: {
        type: Sequelize.INTEGER
      },
      job_type: {
        type: Sequelize.INTEGER
      },
      hours_available: {
        type: Sequelize.INTEGER
      },
      work_remotely: {
        type: Sequelize.BOOLEAN
      },
      drug_test: {
        type: Sequelize.BOOLEAN
      },
      background_check: {
        type: Sequelize.BOOLEAN
      },
      military_veteran: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('AdditionalWorkInformations');
  }
};