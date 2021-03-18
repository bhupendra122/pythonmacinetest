const router = require('express').Router();
const {
  toString
} = require('lodash')

const { wrap } = require('../utils')
const {
  languageHelpers,
  jobHelpers
} = require('../helpers')


// api/Languages/languages
router.get('/search', wrap(async function (req, res) {
  const {
    query: {
      page,
      limit,
      name
    }
  } = req;
  const response = await languageHelpers.searchLanguages(name, limit, page)
  return res.json(response);
}));

// api/Languages/languages
router.get('/', wrap(async function (req, res) {
  const {
    query: {
      page,
      limit
    }
  } = req;
  const response = await languageHelpers.getLanguages(limit, page)
  return res.json(response);
}));

// api/Languages/languages
router.get('/:id', wrap(async function (req, res) {
  const {
    params: {
      id
    }
  } = req;
  const response = await languageHelpers.getLanguage(id)
  return res.json(response);
}));

// Api to create Language router
router.post('/', wrap(async function (req, res) {
  const {
    body: {
      name,
      nativeName,
      code,
    }
  } = req;

  const response = await languageHelpers.addLanguage({
    name: toString(name),
    nativeName: toString(nativeName),
    code: toString(code),
  })

  return res.json(response);
}));

// Api to create Language router
router.put('/:id', wrap(async function (req, res) {
  const {
    body: {
      name,
      nativeName,
      code,
    },
    params: {
      id
    },
  } = req;

  const response = await languageHelpers.updateLanguage({
    name: toString(name),
    nativeName: toString(nativeName),
    code: toString(code),
  }, id)

  return res.json(response);
}));

// Api to remove job languages
router.delete('/', wrap(async function (req, res) {
  const {
    params: {
      languageIds
    },
  } = req;

  const response = await jobHelpers.removeJobLanguages(languageIds)

  return res.json(response);
}));

// Api to delete Language
router.delete('/:id', wrap(async function (req, res) {
  const {
    params: {
      id
    },
  } = req;

  const response = await languageHelpers.deleteLanguage(id)

  return res.json(response);
}));

module.exports = router;
