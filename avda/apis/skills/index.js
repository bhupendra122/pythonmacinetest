const router = require('express').Router();
const {
  toString
} = require('lodash')

const { wrap } = require('../utils')
const {
  appSkillsHelpers,
} = require('../helpers')


// api/skills
router.get('/search', wrap(async function (req, res) {
  const {
    query: {
      page,
      limit,
      name
    }
  } = req;
  const response = await appSkillsHelpers.searchSkills(name, limit, page)
  return res.json(response);
}));

// api/skills
router.get('/', wrap(async function (req, res) {
  const {
    query: {
      page,
      limit
    }
  } = req;
  const response = await appSkillsHelpers.getSkills(limit, page)
  return res.json(response);
}));

// api/skills
router.get('/:id', wrap(async function (req, res) {
  const {
    params: {
      id
    }
  } = req;
  const response = await appSkillsHelpers.getSkill(id)
  return res.json(response);
}));

// Api to create skill
router.post('/', wrap(async function (req, res) {
  const {
    body: {
      name,
    }
  } = req;

  const response = await appSkillsHelpers.addSkill({
    name: toString(name),
  })

  return res.json(response);
}));

// Api to update skill
router.put('/:id', wrap(async function (req, res) {
  const {
    body: {
      name,
    },
    params: {
      id
    },
  } = req;

  const response = await appSkillsHelpers.updateSkill({
    name: toString(name),
  }, id)

  return res.json(response);
}));

// Api to delete Skills
router.delete('/:id', wrap(async function (req, res) {
  const {
    params: {
      id
    },
  } = req;

  const response = await appSkillsHelpers.deleteSkill(id)

  return res.json(response);
}));

module.exports = router;
