'use strict';
const bcrypt = require('bcrypt')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Experience)
      User.hasMany(models.Certification)
      User.hasMany(models.PastWork)
      User.hasOne(models.Profile)
      User.hasOne(models.AdditionalWorkInformation)
      User.belongsToMany(models.Language, { through: models.UserLanguage })
    }
  };

  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: 'Email is not valid.'
        },
        notEmpty: {
          msg: 'Email is required.'
        },
        isUnique: (value, next) => {
          const self = this;
          User.findOne({ where: { email: value } })
            .then((user) => {
              console.log("user", value);
              // reject if a different user wants to use the same email
              if (user && self.id !== user.id) {
                return next('The email address you entered already exists!');
              }
              return next();
            })
            .catch(err => next(err));
        }
      },
    },
    passwordHash: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.VIRTUAL,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Password is required.'
        },
      }
    },
    phoneNumber: {
      field: 'phone_number',
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Phone number is required.'
        },
      }
    },
    isVerified: {
      field: 'is_verified',
      type: DataTypes.BOOLEAN,
    },
    code: {
      field: 'code',
      type: DataTypes.INTEGER,
    },
    verificationCode: {
      field: 'verification_code',
      type: DataTypes.STRING,
    },

  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user, options) => {
    user.passwordHash = bcrypt.hashSync(user.password, 10)
  })

  User.beforeUpdate((user, options) => {
    if (user.password) {
      user.passwordHash = bcrypt.hashSync(user.password, 10)
    }
  })

  User.prototype.authenticate = function (newPassword) {
    return bcrypt.compareSync(newPassword, this.passwordHash)
  }

  return User;
};