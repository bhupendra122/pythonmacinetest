'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SocialMedia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  SocialMedia.init({
    sociableType: {
      field: "sociable_type",
      type: DataTypes.STRING,
    },
    sociableId: {
      field: "sociable_id",
      type: DataTypes.INTEGER,
    },
    name: DataTypes.STRING,
    url: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'SocialMedia',
  });
  return SocialMedia;
};