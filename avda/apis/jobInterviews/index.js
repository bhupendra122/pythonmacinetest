const router = require('express').Router();
const {
  toString
} = require('lodash')

const { wrap } = require('../utils')
const {
  interviewHelpers
} = require('../helpers')

// api/jobs/search
router.get('/', wrap(async function (req, res) {
  const {
    query: {
      limit = 15,
      page = 1,
      title
    }
  } = req;
  const response = await interviewHelpers.createUserJobInterview(page, limit, title)
  return res.json(response);
}));


// api/jobs/:id/interviews
router.post('/', wrap(async function (req, res) {
  const {
    body: {
      startDate,
      endDate,
      interviewDay,
    },
    user: {
      id: UserId
    },
    job: {
      id: JobId
    }
  } = req;
  const response = await interviewHelpers.createUserJobInterview(page, limit, title)
  return res.json(response);
}));

module.exports = router;
