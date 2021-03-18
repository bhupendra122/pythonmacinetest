const {
  Company,
  Job,
  Benefit,
  JobBenefits,
  Language,
  JobLanguage,
  Sequelize,
  sequelize,
} = require('../../database/models')
const excludedKeys = ['id', 'createdAt', 'updatedAt']

function mapData(data) {
  const modelKeys = Object.keys(Job.rawAttributes).filter(key => !excludedKeys.includes(key));

  const modelData = {}

  modelKeys.forEach(key => {
    modelData[key] = data[key]
  })

  return modelData
}

const getPaginationData = (page = 1, limit) => {
  const offset = page > 1 ? page * limit : 0;
  return { offset, limit };
};

async function createJob(jobData, CompanyId) {
  let transaction;

  const languages = jobData.languages;
  const benefits = jobData.benefits;

  // Remove extra model keys
  delete jobData['languages']
  delete jobData['benefits']

  try {
    // get transaction
    transaction = await sequelize.transaction();

    // Create Job for company
    const newJob = await Job.create({
      ...jobData,
      CompanyId
    }, { transaction })

    // Add selected Languages
    await Promise.all(
      languages.map(language => JobLanguage.create({
        LanguageId: language,
        JobId: newJob.id
      }, { transaction }))
    )

    await Promise.all(
      benefits.map(benefit => JobBenefits.create({
        BenefitId: benefit,
        JobId: newJob.id
      }, { transaction }))
    )

    // commit
    await transaction.commit();

    return { success: true, message: "Job created successfully" }
  } catch (err) {
    // Rollback transaction only if the transaction object is defined
    if (transaction) await transaction.rollback();

    return { success: false, message: err.message }
  }
}


function removeJobLanguages(languageIds) {
  return JobLanguage.destroy({
    where: {
      id: languageIds
    }
  })
    .then(() => ({ success: true, message: "Languages removed successfully" }))
    .catch(err => ({ success: false, error: err.errors ? err.errors[0].message : err.message }))
    .catch(err => ({
      success: false,
      message: "Issues trying to connect to database",
      error: err.errors[0]
    }))
}

function removeJobBenefits(benefitIds) {
  return JobBenefits.destroy({
    where: {
      id: benefitIds
    }
  })
    .then(() => ({ success: true, message: "Languages removed successfully" }))
    .catch(err => ({ success: false, error: err.errors ? err.errors[0].message : err.message }))
    .catch(err => ({
      success: false,
      message: "Issues trying to connect to database",
      error: err.errors[0]
    }))
}

async function updateJob(jobData, id, CompanyId) {
  let transaction;

  const languages = jobData.languages;
  const benefits = jobData.benefits;

  // Remove extra model keys
  delete jobData['languages']
  delete jobData['benefits']
  delete jobData['CompanyId']

  try {
    // get transaction
    transaction = await sequelize.transaction();

    // Create Job for company
    await Job.update({
      ...jobData,
    }, {
      where: {
        id,
        CompanyId
      },
      transaction
    })
    // Add selected Languages

    await Promise.all(
      languages.map(async language => {
        let lang = await JobLanguage.findOne({
          where: {
            LanguageId: language.id,
            JobId: id,
            UserId
          },
        })

        if (!lang) {
          lang = await JobLanguage.create({
            LanguageId: language.id,
            JobId: newJob.id,
            level: language.level,
            UserId
          })
        } else {
          await lang.update({
            level: language.level,
          })
        }
        return lang;
      })
    )

    await Promise.all(
      benefits.map(benefit => JobBenefits.findOrCreate({
        where: { BenefitId: benefit, JobId: id },
        defaults: {
          BenefitId: benefit,
          JobId: id
        },
        transaction
      }))
    )

    // commit
    await transaction.commit();

    return { success: true, message: "Job updated successfully" }
  } catch (err) {
    // Rollback transaction only if the transaction object is defined
    if (transaction) await transaction.rollback();

    return { success: false, message: err.message }
  }
}

async function getJobsByCompanyId(CompanyId, limit = 15, offset = 0) {
  return Job.findAndCountAll({
    limit,
    offset,
    where: {
      CompanyId
    }
  }).then(jobs => ({ success: true, jobs }))
    .catch(err => ({ success: false, error: err.errors ? err.errors[0].message : err.message }))
    .catch(err => ({
      success: false,
      message: "Issues trying to connect to database",
      error: err.errors[0]
    }))
}

async function getJobs(page = 1, pageLimit) {
  const { offset, limit } = getPaginationData(page, pageLimit)
  return Job.findAndCountAll({
    limit,
    offset,
    include: [
      {
        model: Company
      },
      {
        model: Language,
        attributes: ['id', 'name', 'nativeName']
      },
      {
        model: Benefit
      },
    ]
  }).then(jobs => ({ success: true, jobs }))
    .catch(err => ({ success: false, error: err.errors ? err.errors[0].message : err.message }))
    .catch(err => ({
      success: false,
      message: "Issues trying to connect to database",
      error: err.errors[0]
    }))
}

async function searchJobs(page = 1, pageLimit, title) {
  const { offset, limit } = getPaginationData(page, pageLimit)
  return Job.findAndCountAll({
    limit,
    offset,
    where: {
      title: { [Sequelize.Op.iLike]: `%${title}%` },
    }
  }).then(jobs => ({ success: true, jobs }))
    .catch(err => ({ success: false, error: err.errors ? err.errors[0].message : err.message }))
    .catch(err => ({
      success: false,
      message: "Issues trying to connect to database",
      error: err.errors[0]
    }))
}

async function getJobByCompanyAndJobId(id, CompanyId) {
  return Job.findOne({
    where: {
      id,
      CompanyId
    }
  }).then(job => ({ success: true, job }))
    .catch(err => ({ success: false, error: err.errors ? err.errors[0].message : err.message }))
    .catch(err => ({
      success: false,
      message: "Issues trying to connect to database",
      error: err.errors[0]
    }))
}

async function deleteJobById(id, CompanyId) {
  const job = await Job.findOne({
    where: {
      id,
      CompanyId,
    }
  })

  if (job) {
    await job.destroy();
    return { success: true, message: "Job deleted successfully" }
  } else return { success: false, message: "Job does not exist or already deleted" }
}

module.exports = {
  createJob,
  mapData,
  getJobs,
  getJobsByCompanyId,
  getJobByCompanyAndJobId,
  deleteJobById,
  searchJobs,
  updateJob,
  removeJobBenefits,
  removeJobLanguages
}
