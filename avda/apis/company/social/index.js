const router = require('express').Router();
const {
  toString
} = require('lodash')

const { wrap } = require('../../utils')
const {
  companyHelpers
} = require('../../helpers')

const SOCIABLE_TYPE = "Company"

// api/compan/social
router.get('/', wrap(async function (req, res) {
  const {
    companyId,
  } = req;

  const response = await companyHelpers.getCompanySocialMediaLinks('Company', companyId)
  return res.json(response);
}));


// api/compan/social
router.get('/:id', wrap(async function (req, res) {
  const {
    companyId,
    params: {
      id
    }
  } = req;
  const response = await companyHelpers.getSocialLinkDetails(id, SOCIABLE_TYPE, companyId)
  return res.json(response);
}));

// Api to create User router
router.post('/', wrap(async function (req, res) {
  const {
    companyId,
    body: {
      name,
      url,
    }
  } = req;

  const response = await companyHelpers.addSocialMediaDetail(SOCIABLE_TYPE, companyId, {
    name: toString(name),
    url: toString(url),
    UserId: req.user.id
  })

  return res.json(response);
}));


// Api to Update social details
router.put('/:id', wrap(async function (req, res) {
  const {
    companyId,
    body: {
      name,
      url,
    },
    params: {
      id
    }
  } = req;

  const response = await companyHelpers.updateSocialMediaDetail(SOCIABLE_TYPE, companyId, {
    name: toString(name),
    url: toString(url)
  })

  return res.json(response);
}));

// Api to delete social media
router.delete('/:id', wrap(async function (req, res) {
  const {
    companyId,
    params: {
      id
    }
  } = req;

  const response = await companyHelpers.deleteSocialLink(id, SOCIABLE_TYPE, companyId)
  return res.json(response);
}));


module.exports = router;
