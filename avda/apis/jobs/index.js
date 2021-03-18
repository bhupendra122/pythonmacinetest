const router = require('express').Router();
const {
  toString
} = require('lodash')

const { wrap } = require('../utils')
const interviews = require('../jobInterviews')
const {
  jobHelpers
} = require('../helpers')

// api/jobs/search
router.get('/search', wrap(async function (req, res) {
  const {
    query: {
      limit = 15,
      page = 1,
      title
    }
  } = req;
  const response = await jobHelpers.searchJobs(page, limit, title)
  return res.json(response);
}));

// api/jobs
router.get('/', wrap(async function (req, res) {
  const {
    query: {
      limit = 15,
      page = 1
    }
  } = req;
  const response = await jobHelpers.getJobs(page, limit)
  return res.json(response);
}));

module.exports = router;
