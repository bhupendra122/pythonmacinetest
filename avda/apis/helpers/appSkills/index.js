const { AppSkill, Sequelize } = require('../../database/models')

async function addSkill(skill) {
  const response = await AppSkill.create(skill)
    .then(() => ({ success: true, message: "Skill added successfully" }))
    .catch(err => ({ success: false, error: err.errors ? err.errors[0].message : err.message }))
    .catch(err => ({
      success: false,
      message: "Issues trying to connect to database",
      error: err.errors[0]
    }))

  return response;
}

function getSkills(limit = 15, page = 0) {
  const offset = page > 1 ? page * limit : 0;

  return AppSkill.findAndCountAll({
    limit,
    offset,
  })
    .then(skills => ({ success: true, skills }))
    .catch(err => ({ success: false, error: err.errors ? err.errors[0].message : err.message }))
    .catch(err => ({
      success: false,
      message: "Issues trying to connect to database",
      error: err.errors[0]
    }))
}


function getSkill(id) {
  return AppSkill.findOne({
    where: {
      id
    }
  })
    .then(language => ({ success: true, language }))
    .catch(err => ({ success: false, error: err.errors ? err.errors[0].message : err.message }))
    .catch(err => ({
      success: false,
      message: "Issues trying to connect to database",
      error: err.errors[0]
    }))
}

function searchSkills(name, limit = 15, page = 1) {
  const offset = page > 1 ? page * limit : 0;

  return AppSkill.findAndCountAll({
    limit,
    offset,
    where: {
      name: { [Sequelize.Op.iLike]: `%${name}%` },
    }

  })
    .then(skills => ({ success: true, skills }))
    .catch(err => ({ success: false, error: err.errors ? err.errors[0].message : err.message }))
    .catch(err => ({
      success: false,
      message: "Issues trying to connect to database",
      error: err.errors[0]
    }))
}

function updateSkill(data, id) {
  return AppSkill.update(
    {
      ...data
    },
    {
      where: {
        id,
      }
    })
    .then(() => ({ success: true, message: "Skill updated successfully" }))
    .catch(err => ({ success: false, error: err.errors ? err.errors[0].message : err.message }))
    .catch(err => ({
      success: false,
      message: "Issues trying to connect to database",
      error: err.errors[0]
    }))
}

async function deleteSkill(id) {
  const skill = await AppSkill.findOne({
    where: { id }
  })

  if (skill) {
    await AppSkill.destroy();
    return { success: true, message: "Skill deleted successfully" }
  } else return { success: false, message: "Skill does not exist or already deleted" }
}

module.exports = {
  addSkill,
  deleteSkill,
  getSkills,
  searchSkills,
  updateSkill,
  getSkill,
}
