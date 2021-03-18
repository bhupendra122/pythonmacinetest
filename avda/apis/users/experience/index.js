const router = require('express').Router();
const {
  toString
} = require('lodash')

const { wrap } = require('../../utils')
const {
  experienceHelpers
} = require('../../helpers')



// api/users/experience
router.get('/', wrap(async function (req, res) {
  const response = await experienceHelpers.getExperiences(req.user.id);
  return res.send(response)
}));

// Api to create User experience
router.post('/', wrap(async function (req, res) {
  const {
    body: {
      jobTitle,
      industry,
      companyName,
      state,
      city,
      description,
      startDate,
      endDate,
      skills,
      references
    }
  } = req;

  const response = await experienceHelpers.createUserExperience({
    jobTitle: toString(jobTitle),
    industry: toString(industry),
    companyName: toString(companyName),
    state: toString(state),
    city: toString(city),
    skills: toString(skills),
    description: toString(description),
    startDate,
    endDate,
    UserId: req.user.id
  }, references)

  return res.json(response);
}));


// Api to create User experience
router.put('/:id', wrap(async function (req, res) {
  const {
    body: {
      jobTitle,
      industry,
      companyName,
      state,
      city,
      description,
      startDate,
      endDate,
      skills,
      references
    },
    params: {
      id
    },
    user: {
      id: UserId
    }
  } = req;

  const response = await experienceHelpers.createUserExperience({
    jobTitle: toString(jobTitle),
    industry: toString(industry),
    companyName: toString(companyName),
    state: toString(state),
    city: toString(city),
    skills: toString(skills),
    description: toString(description),
    startDate,
    endDate,
    UserId: req.user.id
  }, id, UserId, references)

  return res.json(response);
}));

// Delete selected education by id
router.delete('/:id', wrap(async function (req, res) {
  const {
    params: {
      id
    },
    user: {
      id: UserId
    }
  } = req;
  const response = await experienceHelpers.deleteExperiences(id, UserId)
  return res.json(response);
}));

module.exports = router;
