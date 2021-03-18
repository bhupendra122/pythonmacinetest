'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserLanguage extends Model {
    static associate(models) {
      // define association here
    }
  };
  UserLanguage.init({
    UserId: {
      field: "user_id",
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
    level: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserLanguage',
  });
  return UserLanguage;
};