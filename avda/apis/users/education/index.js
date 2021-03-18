const router = require('express').Router();
const {
  toString
} = require('lodash')

const { wrap } = require('../../utils')
const {
  educationHelpers
} = require('../../helpers')



// api/users/experience
router.get('/', wrap(async function (req, res) {
  const response = await educationHelpers.getEducationList(req.user.id);
  return res.send(response)
}));

// Get Education details
router.get('/:id', wrap(async function (req, res) {
  const response = await educationHelpers.getDetails(req.params.id, req.user.id)
  return res.json(response);
}));

// Api to create User experience
router.post('/', wrap(async function (req, res) {
  const {
    body: {
      school,
      startDate,
      endDate,
      areaOfStudy,
      degree,
    }
  } = req;

  const response = await educationHelpers.createUserEducation({
    school: toString(school),
    degree: toString(degree),
    areaOfStudy: toString(areaOfStudy),
    startDate,
    endDate,
    UserId: req.user.id
  })

  return res.json(response);
}));

// Api to create User experience
router.put('/:id', wrap(async function (req, res) {
  const {
    body: {
      school,
      startDate,
      endDate,
      areaOfStudy,
      degree,
    },
    params: {
      id
    },
    user: {
      id: userId
    }
  } = req;

  const response = await educationHelpers.updateEducation({
    school: toString(school),
    degree: toString(degree),
    areaOfStudy: toString(areaOfStudy),
    startDate,
    endDate,
    UserId: req.user.id
  }, id, userId)

  return res.json(response);
}));

// Delete selected education by id
router.delete('/:id', wrap(async function (req, res) {
  const response = await educationHelpers.deleteEducation(req.params.id, req.user.id)
  return res.json(response);
}));

module.exports = router;
