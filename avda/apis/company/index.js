const router = require('express').Router({ mergeParams: true });
const {
  toString
} = require('lodash')
const socialMedial = require('./social')
const jobs = require('./jobs')
const { wrap, loadCompany } = require('../utils')

const {
  companyHelpers
} = require('../helpers')


// api/company
router.get('/:companyId', wrap(async function (req, res) {
  const {
    user: {
      id
    },
    params: {
      companyId
    }
  } = req;
  const response = await companyHelpers.getCompanyDetails(companyId, id)
  return res.json(response);
}));

// Api to create Company
router.post('/', wrap(async function (req, res) {

  const {
    body: {
      name,
      address,
      industry,
      founded,
      hiringManager,
      logo,
      position,
      aboutUs,
      mission,
      vision,
      value
    },
    user
  } = req;

  const response = await companyHelpers.createCompany({
    name: toString(name),
    address: toString(address),
    industry: toString(industry),
    founded,
    hiringManager: toString(hiringManager),
    logo: toString(logo),
    position: toString(position),
    aboutUs: toString(aboutUs),
    mission: toString(mission),
    vision: toString(vision),
    value: toString(value),
    UserId: user.id
  });
  return res.json(response);
}));

// Api to update Company
router.put('/:id', wrap(async function (req, res) {

  const {
    body: {
      name,
      address,
      industry,
      founded,
      hiringManager,
      logo,
      position,
      aboutUs,
      mission,
      vision,
      value
    },
    user: {
      id: UserId
    },
    params: {
      id
    }
  } = req;

  const response = await companyHelpers.updateCompany({
    name: toString(name),
    address: toString(address),
    industry: toString(industry),
    founded,
    hiringManager: toString(hiringManager),
    logo: toString(logo),
    position: toString(position),
    aboutUs: toString(aboutUs),
    mission: toString(mission),
    vision: toString(vision),
    value: toString(value)
  }, id, UserId);
  return res.json(response);
}));

router.delete('/:companyId', wrap(async function (req, res) {
  const {
    params: {
      companyId
    },
    user: {
      id
    }
  } = req;

  const response = await companyHelpers.deleteCompany(companyId, id)
  res.json(response)
}));


router.use('/:companyId/social', loadCompany, socialMedial);
router.use('/:companyId/jobs', loadCompany, jobs);

module.exports = router;
