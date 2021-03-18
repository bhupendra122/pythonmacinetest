const { Language, Sequelize } = require('../../database/models')

async function addLanguage(language) {
  const response = await Language.create(language)
    .then(() => ({ success: true, message: "Language added successfully" }))
    .catch(err => ({ success: false, error: err.errors ? err.errors[0].message : err.message }))
    .catch(err => ({
      success: false,
      message: "Issues trying to connect to database",
      error: err.errors[0]
    }))

  return response;
}

function getLanguages(limit = 15, page = 0) {
  const offset = page > 1 ? page * limit : 0;

  return Language.findAndCountAll({
    limit,
    offset,
  })
    .then(languages => ({ success: true, languages }))
    .catch(err => ({ success: false, error: err.errors ? err.errors[0].message : err.message }))
    .catch(err => ({
      success: false,
      message: "Issues trying to connect to database",
      error: err.errors[0]
    }))
}


function getLanguage(id) {
  return Language.findOne({
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

function searchLanguages(name, limit = 15, page = 1) {
  const offset = page > 1 ? page * limit : 0;

  return Language.findAndCountAll({
    limit,
    offset,
    where: {
      name: { [Sequelize.Op.iLike]: `%${name}%` },
    }

  })
    .then(languages => ({ success: true, languages }))
    .catch(err => ({ success: false, error: err.errors ? err.errors[0].message : err.message }))
    .catch(err => ({
      success: false,
      message: "Issues trying to connect to database",
      error: err.errors[0]
    }))
}

function updateLanguage(data, id) {
  return Language.update(
    {
      ...data
    },
    {
      where: {
        id,
      }
    })
    .then(() => ({ success: true, message: "Language updated successfully" }))
    .catch(err => ({ success: false, error: err.errors ? err.errors[0].message : err.message }))
    .catch(err => ({
      success: false,
      message: "Issues trying to connect to database",
      error: err.errors[0]
    }))
}

async function deleteLanguage(id) {
  const language = await Language.findOne({
    where: { id }
  })

  if (language) {
    await language.destroy();
    return { success: true, message: "Language deleted successfully" }
  } else return { success: false, message: "Language does not exist or already deleted" }
}

module.exports = {
  addLanguage,
  deleteLanguage,
  getLanguages,
  searchLanguages,
  updateLanguage,
  getLanguage,
}
