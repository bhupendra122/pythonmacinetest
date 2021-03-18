const router = require('express').Router();
const {
  toString
} = require('lodash')

const { wrap } = require('../../utils')
const {
  pastWorkHelpers
} = require('../../helpers')



// api/users/pastWork
router.get('/', wrap(async function (req, res) {
  const {
    user: {
      id
    }
  } = req;

  const response = await pastWorkHelpers.getPastWorkList(id);
  return res.send(response)
}));

// api/users/pastWork
router.get('/:id', wrap(async function (req, res) {
  const {
    params: {
      id
    },
    user: {
      id: userId
    }
  } = req;

  const response = await pastWorkHelpers.getDetails(id, userId);
  return res.send(response)
}));

// Api to create User Past Work
router.post('/', wrap(async function (req, res) {
  const {
    body: {
      documentName,
      documentUrl,
      websiteUrl,
    },
    user: {
      id
    }
  } = req;

  const response = await pastWorkHelpers.createUserPastWork({
    documentName: toString(documentName),
    documentUrl: toString(documentUrl),
    websiteUrl: toString(websiteUrl),
    UserId: id
  })

  return res.json(response);
}));

// Api to create User Past Work
router.put('/:id', wrap(async function (req, res) {
  const {
    body: {
      documentName,
      documentUrl,
      websiteUrl,
    },
    user: {
      id: UserId
    },
    params: {
      id
    }
  } = req;

  const response = await pastWorkHelpers.updatePastWork({
    documentName: toString(documentName),
    documentUrl: toString(documentUrl),
    websiteUrl: toString(websiteUrl),
  }, id, UserId)

  return res.json(response);
}));

router.delete('/:id', wrap(async function (req, res) {
  const {
    params: {
      id
    },
    user: {
      id: userId
    }
  } = req;

  const response = await pastWorkHelpers.deletePastWork(id, userId);
  return res.send(response)
}));

module.exports = router;
