'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class JobBenefits extends Model {
    static associate(models) {
      // define association here
    }
  };
  JobBenefits.init({
    JobId: {
      field: "job_id",
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    BenefitId: {
      field: "benefit_id",
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },

  }, {
    sequelize,
    modelName: 'JobBenefits',
  });
  return JobBenefits;
};