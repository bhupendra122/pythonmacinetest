const router = require('express').Router();
const {
  toString
} = require('lodash')

const { wrap } = require('../../utils')
const {
  userJobsHelpers
} = require('../../helpers')


// api/users/jobs
router.get('/', wrap(async function (req, res) {
  const {
    query: {
      limit,
      page
    },
    user: {
      id
    }
  } = req;
  const response = await userJobsHelpers.getUserJob(page, limit, id)
  return res.json(response);
}));

// Api to apply for job
router.post('/', wrap(async function (req, res) {
  const {
    body: {
      jobId,
    },
    user: {
      id
    }
  } = req;

  const response = await userJobsHelpers.createUserJob(id, jobId)

  return res.json(response);
}));

// Api to update
router.put('/:id', wrap(async function (req, res) {
  return res.json({});
}));

// Api to withdraw from job
router.delete('/:id', wrap(async function (req, res) {
  const {
    params: {
      id,
    },
    user: {
      id: userId
    }
  } = req;

  const response = await userJobsHelpers.deleteUserJob(id, userId)

  return res.json(response);
}));

module.exports = router;
