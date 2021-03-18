'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    static associate(models) {
      Job.belongsTo(models.Company)
      Job.belongsToMany(models.Language, { through: models.JobLanguage })
      Job.belongsToMany(models.Benefit, { through: models.JobBenefits })
    }
  };
  Job.init({
    title: DataTypes.STRING,
    CompanyId: {
      field: "company_id",
      type: DataTypes.INTEGER,
    },
    jobType: {
      field: "job_type",
      type: DataTypes.INTEGER,
    },
    freelancerRequired: {
      field: "freelancer_required",
      type: DataTypes.INTEGER,
    },
    experience: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    responsibilities: DataTypes.TEXT,
    location: DataTypes.STRING,
    isRemote: {
      field: "is_remote",
      type: DataTypes.BOOLEAN,
    },
    requiredEducation: {
      field: "required_education",
      type: DataTypes.INTEGER,
    },
    studyField: {
      field: "study_field",
      type: DataTypes.STRING,
    },
    certificationLicense: {
      field: "certification_license",
      type: DataTypes.INTEGER,
    },
    paymentType: {
      field: "payment_type",
      type: DataTypes.INTEGER,
    },
    minPay: {
      field: "min_pay",
      type: DataTypes.INTEGER,
    },
    maxPay: {
      field: "max_pay",
      type: DataTypes.INTEGER,
    },
    notification: {
      type: DataTypes.BOOLEAN,
    },
    emailNotification: {
      field: 'email_notification',
      type: DataTypes.BOOLEAN,
    },
  }, {
    sequelize,
    modelName: 'Job',
  });
  return Job;
};