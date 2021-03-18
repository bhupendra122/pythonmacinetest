'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class JobInterview extends Model {
    static associate(models) {
      // define association here
    }
  };
  JobInterview.init({
    UserId: {
      field: "user_id",
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    JobId: {
      field: "job_id",
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    startTime: {
      field: "start_time",
      type: DataTypes.TIME,
      allowNull: false,
      unique: true
    },
    endTime: {
      field: "end_time",
      type: DataTypes.TIME,
      allowNull: false,
    },
    interviewDay: {
      field: "interview_day",
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'JobInterview',
  });
  return JobInterview;
};