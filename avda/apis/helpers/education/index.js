const settings = require('../../settings')

const { Education } = require('../../database/models')

async function createUserEducation(education) {
  const response = await Education.create(education).then(education => ({ success: true, education }))
    .catch(err => ({ success: false, error: err.errors ? err.errors[0].message : err.message }))
    .catch(err => ({
      success: false,
      message: "Issues trying to connect to database",
      error: err.errors[0]
    }))

  return response;
}

function getEducationList(UserId, limit = 15, offset = 0) {
  return Education.findAll({
    limit,
    offset,
    where: {
      UserId
    }
  })
    .then(educations => ({ success: true, educations }))
    .catch(err => ({ success: false, error: err.errors ? err.errors[0].message : err.message }))
    .catch(err => ({
      success: false,
      message: "Issues trying to connect to database",
      error: err.errors[0]
    }))

}

function getDetails(id, UserId) {
  return Education.findOne({
    where: {
      id,
      UserId,
    }
  })
    .then(education => ({ success: true, education }))
    .catch(err => ({ success: false, error: err.errors ? err.errors[0].message : err.message }))
    .catch(err => ({
      success: false,
      message: "Issues trying to connect to database",
      error: err.errors[0]
    }))
}


function updateEducation(data, id, UserId) {
  return Education.update(
    {
      ...data
    },
    {
      where: {
        id,
        UserId,
      }
    })
    .then(() => ({ success: true, message: "Education updated successfully" }))
    .catch(err => ({ success: false, error: err.errors ? err.errors[0].message : err.message }))
    .catch(err => ({
      success: false,
      message: "Issues trying to connect to database",
      error: err.errors[0]
    }))
}

async function deleteEducation(id, UserId) {
  const education = await Education.findOne({
    where: { id, UserId }
  })

  if (education) {
    await education.destroy();
    return { success: true, message: "Education deleted successfully" }
  } else return { success: false, message: "Education does not exist or already deleted" }
}

module.exports = {
  createUserEducation,
  deleteEducation,
  getDetails,
  getEducationList,
  updateEducation,
}
