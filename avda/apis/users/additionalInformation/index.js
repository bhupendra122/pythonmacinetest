const additionalInformationRouter = require('express').Router();
const {
  toString
} = require('lodash')

const { wrap } = require('../../utils')
const {
  additionalInformationHelpers
} = require('../../helpers')



// api/users/additional-information
additionalInformationRouter.get('/', wrap(async function (req, res) {
  const {
    user: {
      id
    }
  } = req;
  const response = await additionalInformationHelpers.getUserDetails(id)
  return res.send(response)
}));

// Get Education details
additionalInformationRouter.get('/:id', wrap(async function (req, res) {
  const response = await additionalInformationHelpers.getDetails(req.params.id, req.user.id)
  return res.json(response);
}));

// Api to create User experience
additionalInformationRouter.post('/', wrap(async function (req, res) {
  const {
    body: {
      desiredSalary,
      startRange,
      endRange,
      jobType,
      hoursAvailable,
      workRemotely,
      drugTest,
      backgroundCheck,
      militaryVeteran,
      schedule
    },
    user: {
      id
    }
  } = req;


  const addAdditionalInformation = new Promise((resolve, reject) => {
    additionalInformationHelpers.createUserAdditionalWorkInformation({
      desiredSalary: toString(desiredSalary),
      startRange,
      endRange,
      jobType,
      hoursAvailable,
      workRemotely,
      drugTest,
      backgroundCheck,
      militaryVeteran,
      UserId: id
    }).then(response => resolve(response))

  })

  const addUserSchedule = new Promise((resolve, reject) => {
    resolve()
  })
  const response = await Promise.all([addAdditionalInformation, addUserSchedule])
    .then(result => result)
  return res.json(response[0]);
}));


// Update Education details
additionalInformationRouter.put('/:id', wrap(async function (req, res) {
  const {
    body: {
      desiredSalary,
      startRange,
      endRange,
      jobType,
      hoursAvailable,
      workRemotely,
      drugTest,
      backgroundCheck,
      militaryVeteran,
    },
    user: {
      id: userId
    },
    params: {
      id
    }
  } = req;


  const response = await additionalInformationHelpers.updateAdditionalWorkInformation({
    desiredSalary: toString(desiredSalary),
    startRange,
    endRange,
    jobType,
    hoursAvailable,
    workRemotely,
    drugTest,
    backgroundCheck,
    militaryVeteran
  }, id, userId)

  return res.json(response);

}));


// Delete selected education by id
additionalInformationRouter.delete('/:id', wrap(async function (req, res) {
  const response = await additionalInformationHelpers.deleteEducation(req.params.id, req.user.id)
  return res.json(response);
}));

module.exports = additionalInformationRouter;
