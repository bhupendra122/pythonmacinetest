'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AppCertification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  AppCertification.init({
    name: DataTypes.STRING,
    postNominal: {
      field: "post_nominal",
      type: DataTypes.STRING,
    },
    agency: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'AppCertification',
  });
  return AppCertification;
};