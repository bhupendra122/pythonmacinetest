'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class JobLanguage extends Model {
    static associate(models) {
      // define association here
    }
  };
  JobLanguage.init({
    JobId: {
      field: "job_id",
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    LanguageId: {
      field: "language_id",
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    level: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'JobLanguage',
  });
  return JobLanguage;
};