const router = require('express').Router();
const {
  toString
} = require('lodash')

const { wrap } = require('../utils')
const {
  appCertificationsHelpers
} = require('../helpers')


// api/certifications
router.get('/search', wrap(async function (req, res) {
  const {
    query: {
      page,
      limit,
      name
    }
  } = req;
  const response = await appCertificationsHelpers.searchCertification(name, limit, page)
  return res.json(response);
}));

// api/certifications
router.get('/', wrap(async function (req, res) {
  const {
    query: {
      page,
      limit
    }
  } = req;
  const response = await appCertificationsHelpers.getCertifications(limit, page)
  return res.json(response);
}));

// api/certifications
router.get('/:id', wrap(async function (req, res) {
  const {
    params: {
      id
    }
  } = req;
  const response = await appCertificationsHelpers.getCertification(id)
  return res.json(response);
}));

// Api to certification
router.post('/', wrap(async function (req, res) {
  const {
    body: {
      name,
      postNominal,
      agency,
    }
  } = req;

  const response = await appCertificationsHelpers.addCertification({
    name: toString(name),
    postNominal: toString(postNominal),
    agency: toString(agency),
  })

  return res.json(response);
}));

// Api to update certification
router.put('/:id', wrap(async function (req, res) {
  const {
    body: {
      name,
      postNominal,
      agency,
    },
    params: {
      id
    },
  } = req;

  const response = await appCertificationsHelpers.updateCertification({
    name: toString(name),
    postNominal: toString(postNominal),
    agency: toString(agency),
  }, id)

  return res.json(response);
}));

// Api to delete certification
router.delete('/:id', wrap(async function (req, res) {
  const {
    params: {
      id
    },
  } = req;

  const response = await appCertificationsHelpers.deleteCertification(id)

  return res.json(response);
}));

module.exports = router;
