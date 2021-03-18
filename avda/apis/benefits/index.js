const router = require('express').Router();
const {
  toString
} = require('lodash')

const { wrap } = require('../utils')
const {
  benefitsHelpers,
  jobHelpers
} = require('../helpers')


// api/benefits
router.get('/search', wrap(async function (req, res) {
  const {
    query: {
      page,
      limit,
      name
    }
  } = req;
  const response = await benefitsHelpers.searchBenefits(name, limit, page)
  return res.json(response);
}));

// api/benefits
router.get('/', wrap(async function (req, res) {
  const {
    query: {
      page,
      limit
    }
  } = req;
  const response = await benefitsHelpers.getBenefits(limit, page)
  return res.json(response);
}));

// api/benefits
router.get('/:id', wrap(async function (req, res) {
  const {
    params: {
      id
    }
  } = req;
  const response = await benefitsHelpers.getBenefit(id)
  return res.json(response);
}));

// Api to create benefit
router.post('/', wrap(async function (req, res) {
  const {
    body: {
      name,
    }
  } = req;

  const response = await benefitsHelpers.addBenefits({
    name: toString(name),
  })

  return res.json(response);
}));

// Api to Update language
router.put('/:id', wrap(async function (req, res) {
  const {
    body: {
      name,
    },
    params: {
      id
    },
  } = req;

  const response = await benefitsHelpers.updateBenefit({
    name: toString(name),
  }, id)

  return res.json(response);
}));

// Api to remove job benefits
router.delete('/', wrap(async function (req, res) {
  const {
    params: {
      benefitsIds
    },
  } = req;

  const response = await jobHelpers.removeJobBenefits(benefitsIds)

  return res.json(response);
}));

// Api to remove benefit
router.delete('/:id', wrap(async function (req, res) {
  const {
    params: {
      id
    },
  } = req;

  const response = await benefitsHelpers.deleteBenefit(id)

  return res.json(response);
}));

module.exports = router;
