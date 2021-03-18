const { UserJob, Job } = require('../../database/models')


const getPaginationData = (page = 1, limit) => {
  const offset = page > 1 ? page * limit : 0;
  return { offset, limit };
};

async function createUserJob(UserId, JobId) {
  const response = await UserJob.create({ UserId, JobId })
    .then(() => ({ success: true, message: "Successfully applied for job" }))
    .catch(err => ({ success: false, error: err.errors ? err.errors[0].message : err.message }))
    .catch(err => ({
      success: false,
      message: "Issues trying to connect to database",
      error: err.errors[0]
    }))

  return response;
}

async function getUserJob(page, pageLimit, UserId) {

  const { limit, offset } = getPaginationData(page, pageLimit)
  return UserJob.findAndCountAll({
    limit,
    offset,
    where: {
      UserId
    },
  }).then(userJobs => ({ success: true, userJobs }))
    .catch(err => ({ success: false, error: err.errors ? err.errors[0].message : err.message }))
    .catch(err => ({
      success: false,
      message: "Issues trying to connect to database",
      error: err.errors[0]
    }))
}

async function deleteUserJob(id, UserId) {
  const userJob = await UserJob.findOne({
    where: { id, UserId }
  })

  if (userJob) {
    await userJob.destroy();
    return { success: true, message: "Job deleted successfully" }
  } else return { success: false, message: "Job does not exist or already deleted" }
}


module.exports = {
  createUserJob,
  deleteUserJob,
  getUserJob,
}
