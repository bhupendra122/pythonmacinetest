const router = require('express').Router({ mergeParams: true });
const profile = require('./profile')
const experience = require('./experience')
const skills = require('./skills')
const certifications = require('./certifications')
const education = require('./education')
const pastWork = require('./pastWork')
const languages = require('./languages')
const additionalInformationRouter = require('./additionalInformation')
const userJobsRouter = require('./jobs')

const {
  wrap,
  authenticateToken,
} = require('../utils')

const {
  userHelpers
} = require('../helpers')


// api/users
router.get('/', wrap(async function (req, res) {
  return res.json({ message: "Hello Users" });
}));

// Api to create User
router.post('/', wrap(async function (req, res) {

  const {
    body: {
      user,
    }
  } = req;
  const response = await userHelpers.createUser(user);
  return res.json(response);
  await userHelpers.sendEmail();
  return res.json({ success: true });
}));

// Api to create User
router.post('/sendVerification/:id', wrap(async function (req, res) {

  const {
    body: {
      verificationType,
    },
    params: {
      id
    }
  } = req;

  const response = await userHelpers.sendAccountVerification(id, verificationType);
  return res.json(response);
  await userHelpers.sendEmail();
  return res.json({ success: true });
}));

// Api to resend access token
router.post('/resend', wrap(async function (req, res) {
  const {
    body: {
      phoneNumber,
    }
  } = req;
  const response = await userHelpers.resendVerificationCode({ phoneNumber })
  return res.json(response);
}));

// Api to verify and activate user
router.post('/verify', wrap(async function (req, res) {
  const {
    body: {
      code,
      phoneNumber,
      verificationType
    }
  } = req;

  const response = await userHelpers.verifyCode(code, phoneNumber, verificationType)
  return res.json(response);
}));

// Api to login User
router.post('/login', wrap(async function (req, res) {

  const {
    body: {
      email,
      password
    }
  } = req;
  const response = await userHelpers.login(email, password);
  return res.json(response);
}));

// Api to login User
router.post('/forgot', wrap(async function (req, res) {

  const {
    body: {
      email,
    }
  } = req;
  const response = await userHelpers.forgotPassword(email, true);
  return res.json(response);
}));

// Api to login User
router.post('/reset-password', wrap(async function (req, res) {

  const {
    body: {
      email,
    }
  } = req;
  const response = await userHelpers.forgotPassword(email, true);
  return res.json(response);
}));


// Api to test
router.post('/practice', wrap(async function (req, res) {
  const {
    body: {
      email,
      phone_number,
      passwordHash
}
    
  }=req
   const response = await userHelpers.addUser(email, phone_number, passwordHash);
   return res.json(response)
  console.log(req);
  console.log("Prashant singh");
  console.log("Working");
  console.log(response);
}));


router.use('/:userId/profile', authenticateToken, profile);
router.use('/:userId/languages', authenticateToken, languages);
router.use('/:userId/experience', authenticateToken, experience);
router.use('/:userId/skills', authenticateToken, skills);
router.use('/:userId/certifications', authenticateToken, certifications);
router.use('/:userId/education', authenticateToken, education);
router.use('/:userId/pastWork', authenticateToken, pastWork);
router.use('/:userId/additional-information', authenticateToken, additionalInformationRouter);
router.use('/:userId/jobs', authenticateToken, userJobsRouter);


module.exports = router;
