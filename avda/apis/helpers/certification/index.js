const settings = require('../../settings')

const { Certification } = require('../../database/models')

async function createUserCertification(certification) {
  const response = await Certification.create(certification).then(certification => ({ success: true, certification }))
    .catch(err => ({ success: false, error: err.errors ? err.errors[0].message : err.message }))
    .catch(err => ({
      success: false,
      message: "Issues trying to connect to database",
      error: err.errors[0]
    }))

  return response;
}

async function updateCertification(certification, id) {
  const response = await Certification.update(certification, { where: { id } })
    .then(() => ({ success: true, message: "Certification updated successfully" }))
    .catch(err => ({ success: false, error: err.errors ? err.errors[0].message : err.message }))
    .catch(err => ({
      success: false,
      message: "Issues trying to connect to database",
      error: err.errors[0]
    }))

  return response;
}

function getCertification(UserId, limit = 15, offset = 0) {
  return Certification.findAll({
    limit,
    offset,
    where: {
      UserId
    }
  }).then(certifications => ({ success: true, certifications }))
    .catch(err => ({ success: false, error: err.errors ? err.errors[0].message : err.message }))
    .catch(err => ({
      success: false,
      message: "Issues trying to connect to database",
      error: err.errors[0]
    }))
}

async function deleteSocialMediaDetail(id, UserId) {
  const certification = await Certification.findOne({
    where: { id, UserId }
  })

  if (certification) {
    await certification.destroy();
    return { success: true, message: "Certification deleted successfully" }
  } else return { success: false, message: "Certification does not exist or already deleted" }
}


module.exports = {
  createUserCertification,
  getCertification,
  updateCertification,
  deleteSocialMediaDetail,
}
