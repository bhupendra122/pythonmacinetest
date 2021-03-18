'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PastWork extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PastWork.belongsTo(models.User)
    }
  };
  PastWork.init({
    UserId: {
      field: "user_id",
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    documentName: {
      field: "document_name",
      type: DataTypes.STRING,
    },
    documentUrl: {
      field: "document_url",
      type: DataTypes.STRING,
    },
    websiteUrl: {
      field: "website_url",
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'PastWork',
  });
  return PastWork;
};