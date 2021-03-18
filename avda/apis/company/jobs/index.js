const router = require('express').Router();
const {
  toString
} = require('lodash')

const { wrap, authenticateToken } = require('../../utils')
const {
  jobHelpers
} = require('../../helpers')

const interviews = require('../../jobInterviews')
const languages = require('../../languages')

// api/jobs
router.get('/', wrap(async function (req, res) {
  const {
    companyId,
    query: {
      offset,
      limit
    }
  } = req;
  const response = await jobHelpers.getJobsByCompanyId(companyId, limit, offset)

  return res.json(response);
}));


// api/jobs
router.get('/:id', wrap(async function (req, res) {
  const {
    companyId,
    params: {
      id
    }
  } = req;

  const response = await jobHelpers.getJobByCompanyAndJobId(id, companyId)
  return res.json(response);
}));

// Api to create job
router.post('/', wrap(async function (req, res) {
  const {
    companyId,
    body
  } = req;
  const languages = body.languages
  const benefits = body.benefits

  const data = jobHelpers.mapData(body)

  data.languages = languages
  data.benefits = benefits

  const response = await jobHelpers.createJob(data, companyId)
  return res.json(response);
}));


// Api to update job
router.put('/:id', wrap(async function (req, res) {
  const {
    companyId,
    body,
    params: {
      id
    }
  } = req;

  const languages = body.languages
  const benefits = body.benefits

  const data = jobHelpers.mapData(body)

  data.languages = languages
  data.benefits = benefits
  const response = await jobHelpers.updateJob(data, id, companyId)
  return res.json(response);
}));

// Api to delete posted job
router.delete('/:id', wrap(async function (req, res) {
  const {
    companyId,
    params: {
      id
    }
  } = req;

  const response = await jobHelpers.deleteJobById(id, companyId)

  return res.json(response);
}));

// Api to delete posted job

router.use('/:jobId/interviews', authenticateToken, interviews);
router.use('/:jobId/languages', authenticateToken, languages);


module.exports = router;
