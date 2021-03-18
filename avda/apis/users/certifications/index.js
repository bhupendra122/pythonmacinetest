const router = require('express').Router();
const {
  toString
} = require('lodash')

const { wrap } = require('../../utils')
const {
  certificationHelpers
} = require('../../helpers')


// api/users/certification
router.get('/', wrap(async function (req, res) {
  const response = await certificationHelpers.getCertification(req.user.id)
  return res.json(response);
}));


// api/users/certification
router.get('/:id', wrap(async function (req, res) {
  const response = await certificationHelpers.getCertification(req.user.id)
  return res.json(response);
}));

// Api to create User router
router.post('/', wrap(async function (req, res) {
  const {
    body: {
      name,
      fileUrl,
    }
  } = req;

  const response = await certificationHelpers.createUserCertification({
    name: toString(name),
    fileUrl: toString(fileUrl),
    UserId: req.user.id
  })

  return res.json(response);
}));

// Api to create User router
router.put('/:id', wrap(async function (req, res) {
  const {
    body: {
      name,
      fileUrl,
    },
    params: {
      id
    }
  } = req;

  const response = await certificationHelpers.updateCertification({
    name: toString(name),
    fileUrl: toString(fileUrl),
    UserId: req.user.id
  }, id)

  return res.json(response);
}));


// Api to create User router
router.delete('/:id', wrap(async function (req, res) {
  const {
    params: {
      id
    }
  } = req;

  return res.json({ id });
}));


module.exports = router;
