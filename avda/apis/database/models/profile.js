'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    static associate(models) {
      Profile.belongsTo(models.User)
    }
  };
  Profile.init({
    UserId: {
      field: "user_id",
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    firstName: {
      field: "first_name",
      type: DataTypes.STRING,
    },
    lastName: {
      field: "last_name",
      type: DataTypes.STRING,
    },
    age: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    title: DataTypes.STRING,
    bio: DataTypes.TEXT,
    nativeLanguage: {
      field: "native_language",
      type: DataTypes.STRING,
    },
    pictureUrl: {
      field: "profile_picture",
      type: DataTypes.STRING,
    },
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};