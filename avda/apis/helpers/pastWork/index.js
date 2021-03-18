const settings = require('../../settings')

const { PastWork } = require('../../database/models')

async function createUserPastWork(pastWork) {
  const response = await PastWork.create(pastWork).then(pastWork => ({ success: true, pastWork }))
    .catch(err => ({ success: false, error: err.errors ? err.errors[0].message : err.message }))
    .catch(err => ({
      success: false,
      message: "Issues trying to connect to database",
      error: err.errors[0]
    }))

  return response;
}

function getPastWorkList(UserId) {
  return PastWork.findAll({
    where: {
      UserId
    }
  })
    .then(pastWorks => ({ success: true, pastWorks }))
    .catch(err => ({ success: false, error: err.errors ? err.errors[0].message : err.message }))
    .catch(err => ({
      success: false,
      message: "Issues trying to connect to database",
      error: err.errors[0]
    }))

}

function getDetails(id, UserId) {
  return PastWork.findOne({
    where: {
      id,
      UserId,
    }
  })
    .then(pastWork => ({ success: true, pastWork }))
    .catch(err => ({ success: false, error: err.errors ? err.errors[0].message : err.message }))
    .catch(err => ({
      success: false,
      message: "Issues trying to connect to database",
      error: err.errors[0]
    }))
}


function updatePastWork(data, id, UserId) {
  return PastWork.update(
    {
      ...data
    },
    {
      where: {
        id,
        UserId,
      }
    })
    .then(() => ({ success: true, message: "Updated successfully" }))
    .catch(err => ({ success: false, error: err.errors ? err.errors[0].message : err.message }))
    .catch(err => ({
      success: false,
      message: "Issues trying to connect to database",
      error: err.errors[0]
    }))
}

async function deletePastWork(id, UserId) {
  const pastWork = await PastWork.findOne({
    where: { id, UserId }
  })

  if (pastWork) {
    await pastWork.destroy();
    return { success: true, message: "PastWork deleted successfully" }
  } else return { success: false, message: "PastWork does not exist or already deleted" }
}

module.exports = {
  createUserPastWork,
  deletePastWork,
  getDetails,
  getPastWorkList,
  updatePastWork,
}
