'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Jobs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      company_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Companies', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
      },

      title: {
        type: Sequelize.STRING
      },
      job_type: {
        type: Sequelize.INTEGER
      },
      experience: {
        type: Sequelize.INTEGER
      },
      freelancer_required: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.TEXT
      },
      responsibilities: {
        type: Sequelize.TEXT
      },
      location: {
        type: Sequelize.STRING
      },
      is_remote: {
        type: Sequelize.BOOLEAN
      },
      required_education: {
        type: Sequelize.INTEGER
      },
      study_field: {
        type: Sequelize.STRING
      },
      certification_license: {
        type: Sequelize.STRING
      },
      language: {
        type: Sequelize.ARRAY(Sequelize.INTEGER)
      },
      payment_type: {
        type: Sequelize.INTEGER
      },
      min_pay: {
        type: Sequelize.INTEGER
      },
      max_pay: {
        type: Sequelize.INTEGER
      },
      benefits: {
        type: Sequelize.ARRAY(Sequelize.INTEGER)
      },
      notification: {
        type: Sequelize.BOOLEAN
      },
      email_notification: {
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
    await queryInterface.dropTable('Jobs');
  }
};