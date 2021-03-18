'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Skill extends Model {
    static associate(models) {
      // define association here
    }
  };
  Skill.init({
    UserId: {
      field: "user_id",
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    AppSkillId: {
      field: "app_skill_id",
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    experience: DataTypes.INTEGER,
    order: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Skill',
  });
  return Skill;
};