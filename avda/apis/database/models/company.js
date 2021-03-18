'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Company.init({
    UserId: {
      field: "user_id",
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    industry: DataTypes.STRING,
    founded: DataTypes.INTEGER,
    hiringManager: {
      field: "hiring_manager",
      type: DataTypes.STRING,
    },
    logo: DataTypes.STRING,
    position: DataTypes.STRING,
    aboutUs: {
      field: "about_us",
      type: DataTypes.TEXT,
    },
    mission: DataTypes.TEXT,
    vision: DataTypes.TEXT,
    value: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Company',
  });
  return Company;
};