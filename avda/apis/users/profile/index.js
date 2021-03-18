const profile = require('express').Router();
const {
  toString
} = require('lodash')

const { wrap } = require('../../utils')
const {
  userHelpers
} = require('../../helpers')



// api/users/profile
profile.get('/', wrap(async function (req, res) {
  const {
    user: {
      id
    }
  } = req;
  const response = await userHelpers.getProfile(id)
  return res.json(response);
}));

// Api to create User profile
profile.post('/', wrap(async function (req, res) {
  const {
    body: {
      firstName,
      lastName,
      age,
      gender,
      title,
      bio,
      address,
      nativeLanguage,
      pictureUrl,
      languages,
    }
  } = req;

  const response = await userHelpers.createUserProfile({
    firstName: toString(firstName),
    lastName: toString(lastName),
    age: age,
    gender: toString(gender),
    title: toString(title),
    bio: toString(bio),
    address: toString(address),
    nativeLanguage: toString(nativeLanguage),
    pictureUrl: toString(pictureUrl),
    languages
  }, req.user.id);
  return res.json(response);
}));

// Api to create User profile
profile.put('/:id', wrap(async function (req, res) {
  const {
    body: {
      firstName,
      lastName,
      age,
      gender,
      title,
      bio,
      nativeLanguage,
      pictureUrl,
    },
    params: {
      id
    },
    user: {
      id: UserId
    }
  } = req;

  const response = await userHelpers.updateUserProfile({
    firstName: toString(firstName),
    lastName: toString(lastName),
    age: age,
    gender: toString(gender),
    title: toString(title),
    bio: toString(bio),
    nativeLanguage: toString(nativeLanguage),
    pictureUrl: toString(pictureUrl)
  }, id, UserId);

  return res.json(response);
}));

module.exports = profile;
