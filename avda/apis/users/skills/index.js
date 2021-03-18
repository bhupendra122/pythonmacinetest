const router = require('express').Router();
const {
  toString
} = require('lodash')

const { wrap } = require('../../utils')
const {
  userHelpers
} = require('../../helpers')


// api/users/skills
router.get('/', wrap(async function (req, res) {
  const response = await userHelpers.getSkills(req.user.id)
  return res.json(response);
}));

// Api to add user skills
router.post('/', wrap(async function (req, res) {
  const {
    body: {
      appSkillId,
      experience,
      order,
    }
  } = req;

  const response = await userHelpers.addSkills({
    appSkillId,
    experience, UserId: req.user.id,
    order
  })

  return res.json(response);
}));

// Api to add user skills
router.post('/add', wrap(async function (req, res) {
  const {
    body
  } = req;

  const response = await userHelpers.addMultipleSkills(body)

  return res.json(response);
}));

// Api to update user skill
router.put('/:id', wrap(async function (req, res) {
  const {
    body: {
      experience,
      order,
    },
    params: {
      id
    },
    user: {
      id: userId
    }
  } = req;

  const response = await userHelpers.updateSkills({
    experience,
    order,
  }, id, userId)

  return res.json(response);
}));

// Api to delete skill
router.delete('/:id', wrap(async function (req, res) {
  const {
    params: {
      id
    },
    user: {
      id: userId
    }
  } = req;

  const response = await userHelpers.deleteSkill(id, userId)

  return res.json(response);
}));

module.exports = router;
