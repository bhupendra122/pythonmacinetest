const { Benefit, Sequelize } = require('../../database/models')

async function addBenefits(benefit) {
  const response = await Benefit.create(benefit)
    .then(() => ({ success: true, message: "Benefit added successfully" }))
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

function getBenefits(limit = 15, page = 0) {
  const offset = page > 1 ? page * limit : 0;

  return Benefit.findAndCountAll({
    limit,
    offset,
  })
    .then(benefits => ({ success: true, benefits }))
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


function getBenefit(id) {
  return Benefit.findOne({
    where: {
      id
    }
  })
    .then(benefit => ({ success: true, benefit }))
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

function searchBenefits(name, limit = 15, page = 1) {
  const offset = page > 1 ? page * limit : 0;

  return Benefit.findAndCountAll({
    limit,
    offset,
    where: {
      name: { [Sequelize.Op.iLike]: `%${name}%` },
    }

  })
    .then(benefits => ({ success: true, benefits }))
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

function updateBenefit(data, id) {
  return Benefit.update(
    {
      ...data
    },
    {
      where: {
        id,
      }
    })
    .then(() => ({ success: true, message: "Benefit updated successfully" }))
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

async function deleteBenefit(id) {
  const benefit = await Benefit.findOne({
    where: { id }
  })

  if (benefit) {
    await benefit.destroy();
    return { success: true, message: "Benefit deleted successfully" }
  } else return { success: false, message: "Benefit does not exist or already deleted" }
}

module.exports = {
  addBenefits,
  deleteBenefit,
  getBenefits,
  searchBenefits,
  updateBenefit,
  getBenefit,
}
