const { AppCertification, Sequelize } = require('../../database/models')

async function addCertification(data) {
  const response = await AppCertification.create(data)
    .then(() => ({ success: true, message: "Certification added successfully" }))
    .catch(err => ({ success: false, error: err.errors ? err.errors[0].message : err.message }))
    .catch(err => ({
      success: false,
      message: "Issues trying to connect to database",
      error: err.errors[0]
    }))

  return response;
}

function getCertifications(limit = 15, page = 0) {
  const offset = page > 1 ? page * limit : 0;

  return AppCertification.findAndCountAll({
    limit,
    offset,
    rder: [
      ['id', 'ASC']
    ]
  })
    .then(certification => ({ success: true, certification }))
    .catch(err => ({ success: false, error: err.errors ? err.errors[0].message : err.message }))
    .catch(err => ({
      success: false,
      message: "Issues trying to connect to database",
      error: err.errors[0]
    }))
}


function searchCertification(name, limit = 15, page = 1) {
  const offset = page > 1 ? page * limit : 0;

  return AppCertification.findAndCountAll({
    limit,
    offset,
    where: {
      name: { [Sequelize.Op.iLike]: `%${name}%` },
    }

  })
    .then(certifications => ({ success: true, certifications }))
    .catch(err => ({ success: false, error: err.errors ? err.errors[0].message : err.message }))
    .catch(err => ({
      success: false,
      message: "Issues trying to connect to database",
      error: err.errors[0]
    }))
}

function getCertification(id) {
  return AppCertification.findOne(
    {
      where: {
        id,
      }
    })
    .then(certification => ({ success: true, certification }))
    .catch(err => ({ success: false, error: err.errors ? err.errors[0].message : err.message }))
    .catch(err => ({
      success: false,
      message: "Issues trying to connect to database",
      error: err.errors[0]
    }))
}

function updateCertification(data, id) {
  return AppCertification.update(
    {
      ...data
    },
    {
      where: {
        id,
      }
    })
    .then(() => ({ success: true, message: "Certification updated successfully" }))
    .catch(err => ({ success: false, error: err.errors ? err.errors[0].message : err.message }))
    .catch(err => ({
      success: false,
      message: "Issues trying to connect to database",
      error: err.errors[0]
    }))
}

async function deleteCertification(id) {
  const certification = await AppCertification.findOne({
    where: { id }
  })

  if (certification) {
    await certification.destroy();
    return { success: true, message: "Certification deleted successfully" }
  } else return { success: false, message: "Certification does not exist or already deleted" }
}

module.exports = {
  addCertification,
  deleteCertification,
  getCertifications,
  getCertification,
  searchCertification,
  updateCertification,
}
