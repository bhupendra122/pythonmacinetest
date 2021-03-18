const settings = require('../../settings')
const {
  isArray
} = require('lodash')

const { Company, SocialMedia } = require('../../database/models')

async function createCompany(company) {
  const response = await Company.create(company).then(company => ({ success: true, company }))
    .catch(err => ({ success: false, error: err.errors ? err.errors[0].message : err.message }))
    .catch(err => ({
      success: false,
      message: "Issues trying to connect to database",
      error: err.errors[0]
    }))

  return response;
}

function getCompanies(UserId) {
  return Company.findAll({
    where: {
      UserId
    }
  })
    .then(companies => ({ success: true, companies }))
    .catch(err => ({ success: false, error: err.errors ? err.errors[0].message : err.message }))
    .catch(err => ({
      success: false,
      message: "Issues trying to connect to database",
      error: err.errors[0]
    }))
}

function getCompanyDetails(id, UserId) {
  return Company.findOne({
    where: {
      id,
      UserId,
    }
  }).then(company => ({ success: true, company }))
    .catch(err => ({ success: false, error: err.errors ? err.errors[0].message : err.message }))
    .catch(err => ({
      success: false,
      message: "Issues trying to connect to database",
      error: err.errors[0]
    }))
}

function updateCompany(data, id, UserId) {
  return Company.update(
    {
      ...data,
    },
    {
      where: {
        id,
        UserId,
      }
    }).then(() => ({ success: true, message: "Company updated successfully" }))
    .catch(err => ({ success: false, error: err.errors ? err.errors[0].message : err.message }))
    .catch(err => ({
      success: false,
      message: "Issues trying to connect to database",
      error: err.errors[0]
    }))
}


async function deleteCompany(id, UserId) {
  const company = await Company.findOne({
    where: { id, UserId }
  })

  if (company) {
    await company.destroy();
    return { success: true, message: "Company deleted successfully" }
  } else return { success: false, message: "Company does not exist or already deleted" }
}

async function addSocialMediaDetail(sociableType, sociableId, values) {
  const response = await SocialMedia.findOrCreate({
    where: { sociableType, sociableId, name: values.name },
    defaults: {
      ...values,
      sociableType,
      sociableId
    }
  })
    .catch(err => ({ success: false, error: err.errors ? err.errors[0].message : err.message }))
    .catch(err => ({
      success: false,
      message: "Issues trying to connect to database",
      error: err.errors[0]
    }))

  if (isArray(response)) {
    const [socialMedia] = response
    return { socialMedia: socialMedia.dataValues, success: true };
  } else return response

}

function getSocialLinkDetails(id, sociableType, sociableId) {
  return SocialMedia.findOne({
    where: { id, sociableType, sociableId },
  }).then(socialMedia => ({ success: true, socialMedia }))
    .catch(err => ({ success: false, error: err.errors ? err.errors[0].message : err.message }))
    .catch(err => ({
      success: false,
      message: "Issues trying to connect to database",
      error: err.errors[0]
    }))
}

function getSocialMediaDetail(sociableType, sociableId, name) {
  return SocialMedia.findOne({
    where: { sociableType, sociableId, name },
  }).then(socialMedia => ({ success: true, socialMedia }))
    .catch(err => ({ success: false, error: err.errors ? err.errors[0].message : err.message }))
    .catch(err => ({
      success: false,
      message: "Issues trying to connect to database",
      error: err.errors[0]
    }))
}

function updateSocialMediaDetail(sociableType, sociableId, values) {
  return SocialMedia.update(
    {
      ...values,
    },
    {
      where: { sociableType, sociableId, name: values.name },
    }).then(() => ({ success: true, message: "Details updated successfully" }))
    .catch(err => ({ success: false, error: err.errors ? err.errors[0].message : err.message }))
    .catch(err => ({
      success: false,
      message: "Issues trying to connect to database",
      error: err.errors[0]
    }))
}

async function deleteSocialLink(id, sociableType, sociableId) {
  const socialLink = await SocialMedia.findOne({
    where: {
      sociableType,
      sociableId,
      id
    }
  })

  if (socialLink) {
    await socialLink.destroy();
    return { success: true, message: "Social Link deleted successfully" }
  } else return { success: false, message: "Social Link does not exist or already deleted" }
}

function getCompanySocialMediaLinks(sociableType, sociableId) {
  return SocialMedia.findAll({
    where: {
      sociableType,
      sociableId
    }
  }).then(socialLinks => ({ success: true, socialLinks }))
    .catch(err => ({ success: false, error: err.errors ? err.errors[0].message : err.message }))
    .catch(err => ({
      success: false,
      message: "Issues trying to connect to database",
      error: err.errors[0]
    }))

}

module.exports = {
  addSocialMediaDetail,
  createCompany,
  deleteCompany,
  deleteSocialLink,
  getCompanyDetails,
  getCompanySocialMediaLinks,
  getCompanies,
  getSocialLinkDetails,
  getSocialMediaDetail,
  updateSocialMediaDetail,
  updateCompany,
}
