'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AdditionalWorkInformation extends Model {
    static associate(models) {
      AdditionalWorkInformation.belongsTo(models.User)
    }
  };
  AdditionalWorkInformation.init({
    UserId: {
      field: "user_id",
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    desiredSalary: {
      field: "desired_salary",
      type: DataTypes.INTEGER,
    },
    startRange: {
      field: "start_range",
      type: DataTypes.INTEGER,
    },
    endRange: {
      field: "end_range",
      type: DataTypes.INTEGER,
    },
    jobType: {
      field: "job_type",
      type: DataTypes.INTEGER,
    },
    hoursAvailable: {
      field: "hours_available",
      type: DataTypes.INTEGER,
    },
    workRemotely: {
      field: "work_remotely",
      type: DataTypes.BOOLEAN,
    },
    drugTest: {
      field: "drug_test",
      type: DataTypes.BOOLEAN,
    },
    backgroundCheck: {
      field: "background_check",
      type: DataTypes.BOOLEAN,
    },
    militaryVeteran: {
      field: "military_veteran",
      type: DataTypes.BOOLEAN,
    },
  }, {
    sequelize,
    modelName: 'AdditionalWorkInformation',
  });
  return AdditionalWorkInformation;
};