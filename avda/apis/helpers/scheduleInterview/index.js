const { User, Profile, Company, Job, JobInterview } = require('../../database/models')


const getPaginationData = (page = 1, limit) => {
  const offset = page > 1 ? page * limit : 0;
  return { offset, limit };
};

async function createUserJobInterview(data, UserId, JobId) {
  const response = await JobInterview.findOrCreate({
    where: { UserId, JobId },
    defaults: {
      ...data,
      UserId,
      JobId
    }
  })
    .catch(err => ({ success: false, error: err.errors ? err.errors[0].message : err.message }))
    .catch(err => ({
      success: false,
      message: "Issues trying to connect to database",
      error: err.errors[0]
    }))

  if (isArray(response)) {
    const [jobInterview] = response
    return { interview: jobInterview.dataValues, success: true };
  } else return response

}

function getInterviews(UserId) {
  return JobInterview.findAll({
    where: {
      UserId
    },
    include: [{
      model: Job,
      attributes: ['id', 'UserId', 'title'],
      include: [{
        model: Company,
        attributes: ['id', 'name', 'addresss']
      }]
    }, {
      model: User,
      attributes: ['id', 'email'],
      include: [{
        model: Profile,
        attributes: ['id', 'firstName', 'lastName', 'age']
      }]
    }]
  })
    .then(pastWorks => ({ success: true, pastWorks }))
    .catch(err => ({ success: false, error: err.errors ? err.errors[0].message : err.message }))
    .catch(err => ({
      success: false,
      message: "Issues trying to connect to database",
      error: err.errors[0]
    }))

}

async function deleteUserJobInterview(id, UserId) {
  const userInterview = await JobInterview.findOne({
    where: { id, UserId }
  })

  if (userInterview) {
    await userInterview.destroy();
    return { success: true, message: "Job deleted successfully" }
  } else return { success: false, message: "Job does not exist or already deleted" }
}


module.exports = {
  createUserJobInterview,
  deleteUserJobInterview,
  getInterviews,
}
