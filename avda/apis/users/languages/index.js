const router = require('express').Router();

const { wrap } = require('../../utils')
const {
  userHelpers
} = require('../../helpers')

// Api to create User router
router.put('/', wrap(async function (req, res) {
  const {
    body: {
      languages
    },
    user: {
      id
    }
  } = req;

  const response = await userHelpers.updateUserLanguages(languages, id);
  return res.json(response);
}));

// Delete Language
router.delete('/:id', wrap(async function (req, res) {
  const {
    params: {
      id
    },
    user: {
      id: userId
    }
  } = req;

  const response = await userHelpers.deleteUserLanguage(id, userId);
  return res.json(response);
}));

module.exports = router;
