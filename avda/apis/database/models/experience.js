'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Experience extends Model {
    static associate(models) {
      Experience.belongsTo(models.User)
      Experience.hasMany(models.JobReference)
    }
  };

  Experience.init({
    UserId: {
      field: "user_id",
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    jobTitle: {
      field: "job_title",
      type: DataTypes.STRING,
    },
    industry: DataTypes.STRING,
    companyName: {
      field: "company_name",
      type: DataTypes.STRING,
    },
    state: DataTypes.STRING,
    city: DataTypes.STRING,
    description: DataTypes.TEXT,
    startDate: {
      field: "start_date",
      type: DataTypes.DATE,
    },
    endDate: {
      field: "end_date",
      type: DataTypes.DATE,
    },
    skills: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Experience',
  });
  return Experience;
};