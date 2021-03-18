const settings = require('../../settings')

const { AdditionalWorkInformation, UserSchedule } = require('../../database/models')

async function createUserAdditionalWorkInformation(additionalInformation) {
  const response = await AdditionalWorkInformation.create(additionalInformation)
    .then(additionalInformation => ({ success: true, additionalInformation }))
    .catch(err => ({
      success: false,
      error: err.errors ? err.errors[0].message : err.message
    }))
    .catch(err => ({
      success: false,
      message: "Issues trying to connect to database",
      error: err.errors[0]
    }))

  return response;
}

function getDetails(id, UserId) {
  return AdditionalWorkInformation.findOne({
    where: {
      id,
      UserId,
    }
  })
    .then(additionalInformation => ({ success: true, additionalInformation }))
    .catch(err => ({
      success: false,
      error: err.errors ? err.errors[0].message : err.message
    }))
    .catch(err => ({
      success: false,
      message: "Issues trying to connect to database",
      error: err.errors[0]
    }))
}

function getUserDetails(UserId) {
  return AdditionalWorkInformation.findOne({
    where: {
      UserId,
    }
  })
    .then(additionalInformation => ({ success: true, additionalInformation }))
    .catch(err => ({
      success: false,
      error: err.errors ? err.errors[0].message : err.message
    }))
    .catch(err => ({
      success: false,
      message: "Issues trying to connect to database",
      error: err.errors[0]
    }))
}


function updateAdditionalWorkInformation(data, id, UserId) {
  return AdditionalWorkInformation.update(
    {
      ...data,
    },
    {
      where: {
        id,
        UserId,
      }
    })
    .then(() => ({ success: true, message: "Information Updated Successfully" }))
    .catch(err => ({
      success: false,
      error: err.errors ? err.errors[0].message : err.message
    }))
    .catch(err => ({
      success: false,
      message: "Issues trying to connect to database",
      error: err.errors[0]
    }))
}


async function deleteAdditionalWorkInformation(id, UserId) {
  const additionalInformation = await AdditionalWorkInformation.findOne({
    where: {
      id,
      UserId,
    }
  })

  if (additionalInformation) {
    await additionalInformation.destroy();
    return { success: true, message: "Additional Information deleted successfully" }
  } else return { success: false, message: "Additional Information does not exist or already deleted" }
}

function addUserSchedule(schedule) {

}

module.exports = {
  addUserSchedule,
  createUserAdditionalWorkInformation,
  deleteAdditionalWorkInformation,
  getDetails,
  getUserDetails,
  updateAdditionalWorkInformation,
}
