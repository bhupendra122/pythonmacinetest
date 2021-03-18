'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Benefit extends Model {
    static associate(models) {
      Benefit.belongsToMany(models.Job, { through: models.JobBenefits })

    }
  };
  Benefit.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Benefit',
  });
  return Benefit;
};