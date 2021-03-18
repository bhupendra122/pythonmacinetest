'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserJob extends Model {
    static associate(models) {
      // UserJob.belongsToMany(models.User)
    }
  };

  UserJob.init({
    UserId: {
      field: "user_id",
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    JobId: {
      field: "job_id",
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    appliedTime: {
      field: "applied_time",
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
  }, {
    sequelize,
    modelName: 'UserJob',
  });
  return UserJob;
};