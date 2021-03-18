'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Certification extends Model {
    static associate(models) {
      Certification.belongsTo(models.User)
    }
  };

  Certification.init({
    name: DataTypes.STRING,
    UserId: {
      field: "user_id",
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    fileUrl: {
      field: "file_url",
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Certification',
  });
  return Certification;
};