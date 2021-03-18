const settings = require('../../settings')

const { Experience, JobReference } = require('../../database/models')

async function createUserExperience(experience, jobReferences) {
  const response = await Experience.create(experience).then(experience => ({ success: true, experience }))
    .catch(err => ({ success: false, error: err.errors ? err.errors[0].message : err.message }))
    .catch(err => ({
      success: false,
      message: "Issues trying to connect to database",
      error: err.errors[0]
    }))

  if (response.success) {
    await addJobReference(jobReferences, response.experience.id)
  }

  return response;
}

async function addJobReference(references, jobId) {
  return Promise.all(
    references.map(reference => JobReference.create({
      ...reference,
      ExperienceId: jobId
    }))
  )
}

function getExperiences(UserId, limit = 15, offset = 0) {
  return Experience.findAll({
    limit,
    offset,
    where: {
      UserId
    },
    include: [JobReference]
  })
}

function updateExperiences(data, id, UserId, references) {
  return Experience.update(
    {
      ...data
    },
    {
      where: {
        UserId,
        id
      }
    })
    .then(experience => ({ success: true, experience }))
    .catch(err => ({ success: false, error: err.errors ? err.errors[0].message : err.message }))
    .catch(err => ({
      success: false,
      message: "Issues trying to connect to database",
      error: err.errors[0]
    }))
}

async function deleteExperiences(id, UserId) {
  const experience = await Experience.findOne({
    where: { id, UserId }
  })

  if (experience) {
    await experience.destroy();
    return { success: true, message: "Experience deleted successfully" }
  } else return { success: false, message: "Experience does not exist or already deleted" }
}

module.exports = {
  createUserExperience,
  deleteExperiences,
  getExperiences,
  updateExperiences,
}
