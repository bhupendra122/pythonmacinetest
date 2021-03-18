'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class JobReference extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      JobReference.belongsTo(models.Experience)
    }
  };
  JobReference.init({
    name: DataTypes.STRING,
    jobTitle: {
      field: "job_title",
      type: DataTypes.DATE,
    },
    phoneNumber: {
      field: "phone_number",
      type: DataTypes.DATE,
    },
    email: DataTypes.STRING,
    ExperienceId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'JobReference',
  });
  return JobReference;
};