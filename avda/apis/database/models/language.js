'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Language extends Model {
    static associate(models) {
      Language.belongsToMany(models.Job, { through: models.JobLanguage })
      Language.belongsToMany(models.User, { through: models.UserLanguage })
    }
  };
  Language.init({
    name: DataTypes.STRING,
    nativeName: {
      field: "native_name",
      type: DataTypes.STRING,
    },
    code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Language',
  });
  return Language;
};