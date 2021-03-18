'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Education extends Model {
    static associate(models) {
      Education.belongsTo(models.User)
    }
  };

  Education.init({
    UserId: {
      field: "user_id",
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    school: DataTypes.STRING,
    startDate: {
      field: "start_date",
      type: DataTypes.DATE,
    },
    endDate: {
      field: "end_date",
      type: DataTypes.DATE,
    },
    areaOfStudy: {
      field: "area_of_study",
      type: DataTypes.STRING,
    },
    degree: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Education',
  });
  return Education;
};