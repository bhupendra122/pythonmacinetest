
const {
  toString, isArray
} = require('lodash')
const jwt = require('jsonwebtoken')
const settings = require('../../settings')
const constants = require('../../settings/constants')

const {
  User,
  Profile,
  Skill,
  UserLanguage,
  Language,
  sequelize,
} = require('../../database/models')
const twilioService = require('../../utils/twilio');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const generateCode = () => Math.floor(100000 + Math.random() * 900000)

async function generateActivationCode() {
  let code = generateCode()
  const user = await User.findOne({
    where: {
      code
    }
  })

  if (user) {
    code = await generateActivationCode()
  }

  return code;
}

async function createUser(user) {
  // console.log(user.email);
  return User.create(user)
    .then(user => ({ success: true, user }))
    .catch(err => ({ success: false, error: err.errors ? err.errors[0].message : err.message }))
    .catch(err => ({
      success: false,
      message: "Issues trying to connect to database",
      error: err.errors ? err.errors[0].message : err.message
    }))
}

async function sendAccountVerification(id, verificationType = "email") {
  const user = await User.findOne({ where: { id } })
    .then(user => user)
    .catch(() => false)
    .catch(() => false)


  if (user) {
    const code = await generateActivationCode()

    await User.update({ code }, { where: { id: user.dataValues.id } })

    if (verificationType === "phone") {
      response = await sendVerificationCode(user.dataValues)
    } else {
      await sendEmail(
        code,
        user.email,
        { name: constants.SENDER_NAME, email: constants.SENDER },
        constants.ACTIVATION_EMAIL_SUBJECT
      )

      response = { success: true, message: "Please check your email for verification code" }
    }

    return response;
  }

  return { success: false, message: "User not found" };

  await sendEmail()
  return { success: true }
}


async function createUserProfile(profileData, UserId) {

  const languages = profileData.languages;

  delete profileData['languages']

  let transaction;

  try {
    // get transaction
    transaction = await sequelize.transaction();

    const profile = await Profile.findOrCreate({
      where: { UserId },
      defaults: {
        ...profileData,
        UserId
      },
      transaction
    })

    if (!profile[1]) {
      await Profile.update(profileData, {
        where: {
          UserId
        }, transaction
      })
    }

    // Add selected Languages
    await Promise.all(
      languages.map(language => UserLanguage.create({
        UserId,
        LanguageId: language.id,
        level: language.level
      }, { transaction }))
    )

    // commit
    await transaction.commit();

    return { success: true, message: "Profile created successfully" }
  } catch (err) {
    // Rollback transaction only if the transaction object is defined
    if (transaction) await transaction.rollback();

    return { success: false, message: err.message }
  }
}

async function updateUserProfile(profileData, id, UserId) {
  return Profile.update(profileData, { where: { id, UserId } })
    .then(profile => ({ success: true, profile }))
    .catch(err => ({ success: false, error: err.errors ? err.errors[0].message : err.message }))
    .catch(err => ({
      success: false,
      message: "Issues trying to connect to database",
      error: err.errors[0]
    }))
}


async function updateUserLanguages(languages, UserId) {
  try {
    // Add selected Languages
    await Promise.all(
      languages.map(async language => {
        let lang = await UserLanguage.findOne({
          where: {
            LanguageId: language.id,
            UserId
          },
        })

        if (!lang) {
          lang = await UserLanguage.create({
            LanguageId: language.id,
            level: language.level,
            UserId
          })
        } else {
          await lang.update({
            level: language.level,
          })
        }
      })
    )

    return { success: true, message: "Languages updated successfully" }
  } catch (err) {
    return { success: false, message: err.message }
  }
}


function generateAccessToken(user) {
  return jwt.sign({
    id: user.id,
    email: user.email
  }, settings.jwtSecret, { expiresIn: '30d' })
}

async function findUser(whereCondition) {
  const user = User.findOne({
    where: whereCondition
  })
    .then(user => user)
    .catch(() => false)
    .catch(() => false)


  if (!user) {
    return { message: "User not found" }
  }

  await user.update({
    code: null,
    isVerified: true
  })

  const token = generateAccessToken(user.dataValues);

  return {
    token,
  }
}

async function verifyCode(code, to, type = "phone") {
  const user = await User.findOne({
    where: {
      code
    }
  })
    .then(user => user)
    .catch(() => false)
    .catch(() => false)

  if (type === "phone") {
    const response = await twilioService.verify.services(process.env.TWILIO_SERVICE_SID)
      .verificationChecks
      .create({ to, code })
      .then(verification_check => verification_check);

    if (response.valid) {
      return { success: false, message: "Invalid Phonenumber or code" }
    }
  }

  if (!user) {
    return { message: "Not valid number or code" }
  }

  await User.update({
    code: null,
    isVerified: true
  }, {
    where: {
      id: user.dataValues.id
    }
  })

  const token = generateAccessToken(user.dataValues);

  return {
    token,
  }

}

async function login(email, password) {
  await User.build({
    email: toString(email),
    password: toString(password),
  })

  const user = await User.findOne({
    where: {
      email
    }
  })

  if (!user || !user.isVerified) {
    return {
      message: 'Account is not activated.',
    }
  }

  if (!user || !user.authenticate(password)) {
    return {
      message: 'Email and password combination does not exist.',
    }
  }

  const token = generateAccessToken(user.dataValues)

  return {
    token,
  }
}

async function forgotPassword(email, isVerified = true) {
  const user = await User.findOne({
    where: {
      email,
      isVerified
    }
  })

  if (!user || !user.isVerified) {
    return {
      message: 'User not found.',
    }
  }

  return {
    user,
  }
}

async function updatePassword(password, verificationCode) {

  const user = User.findOne({ where: { verificationCode } })

  if (!user) {
    return {
      message: 'User not found with verification code provided.',
    }
  }

  await user.update({
    password,
    verificationCode: null,
  })

  return {
    message: "User password updated successfully"
  }
}

async function addSkills(skill, UserId) {
  const response = await Skill.findOrCreate({
    where: { UserId, AppSkillId: skill.appSkillId },
    defaults: {
      ...skill,
      UserId
    }
  })
    .catch(err => ({ success: false, error: err.errors ? err.errors[0].message : err.message }))
    .catch(err => ({
      success: false,
      message: "Issues trying to connect to database",
      error: err.errors[0]
    }))

  if (isArray(response)) {
    const [skill] = response
    return { skill: skill.dataValues, success: true };
  } else return response
}

function getProfile(UserId) {
  return Profile.findOne({
    where: {
      UserId
    },
    include: [
      {
        model: User,
        attributes: ['id', 'email', 'phoneNumber', 'isVerified'],
        include: [
          {
            model: Language,
            attributes: ['id', 'name', 'nativeName'],
            through: {
              attributes: ['level']
            }
          },
        ]
      }
    ]
  })
    .then(profile => ({ success: true, profile }))
    .catch(err => ({ success: false, error: err.errors ? err.errors[0].message : err.message }))
    .catch(err => ({
      success: false,
      message: "Issues trying to connect to database",
      error: err.errors[0]
    }))
}

async function addMultipleSkills(skills, UserId) {

  let transaction;

  try {
    // get transaction
    transaction = await sequelize.transaction();

    // Added user selected skills
    await Promise.all(
      skills.map(skill => Skill.findOrCreate({
        where: { UserId, AppSkillId: skill.appSkillId },
        defaults: {
          ...skill,
          UserId
        },
        transaction
      }))
    )
    // commit
    await transaction.commit();

    return { success: true, message: "Skills added successfully" }
  } catch (err) {
    // Rollback transaction only if the transaction object is defined
    if (transaction) await transaction.rollback();

    return { success: false, message: err.message }
  }
}

function updateSkills(skill, id, UserId) {
  return Skill.update(
    skill,
    {
      where: {
        id,
        UserId
      }
    }
  ).then(() => ({ success: true, message: "Skill updated successfully" }))
    .catch(err => ({ success: false, error: err.errors ? err.errors[0].message : err.message }))
    .catch(err => ({
      success: false,
      message: "Issues trying to connect to database",
      error: err.errors[0]
    }))
}

async function deleteSkill(id, UserId) {
  const deletedSkill = await Skill.findOne({
    where: { id, UserId }
  })

  if (deletedSkill) {
    await deletedSkill.destroy();
    return { success: true, message: "Skill deleted successfully" }
  } else return { success: false, message: "Skill does not exist or already deleted" }
}

async function deleteUserLanguage(LanguageId, UserId) {
  const language = await UserLanguage.findOne({
    where: { LanguageId, UserId }
  })

  if (language) {
    await language.destroy();
    return { success: true, message: "Language deleted successfully" }
  } else return { success: false, message: "Language does not exist or already deleted" }
}

function getSkills(UserId) {
  return Skill.findAll({
    where: {
      UserId
    }
  })
}

async function resendVerificationCode(whereCondition) {
  const user = await findUser(whereCondition)
  return sendVerificationCode(user)
}

async function sendVerificationCode(user) {
  return twilioService.verify.services(process.env.TWILIO_SERVICE_SID)
    .verifications
    .create({ to: user.phoneNumber, code: user.code, channel: 'sms' })
    .then(verification_check => verification_check)
    .catch(err => ({
      success: false,
      err,
    }))
}

async function sendVerificationEmail(to, from, subject, body, html) {
  const msg = {
    to,
    from,
    subject,
    text: body,
    html,
  }
  await sgMail
    .send(msg)
    .then(() => console.log('Email sent'))
    .catch((error) => console.error(error))

}

async function sendEmail(
  code = "123456",
  to = "",
  from = {
    name: constants.SENDER_NAME,
    email: constants.SENDER
  },
  subject = constants.ACTIVATION_EMAIL_SUBJECT,
  body = "Please use the below mentioned code to verify your account",
  html = "<h1>" + code + "</h1>"
) {
  const msg = {
    to,
    from,
    subject,
    text: body,
    html,
  }

  await sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
      return true
    })
    .catch((error) => console.error('\n\n Email: ', error.response.body))

}
 async function addUser(email, phone_number, passwordHash) {
  //return User.create(email, phone_number, passwordHash);
    // .then(user => ({ success: true, user }))
    // .catch(err => ({ success: false, error: err.errors ? err.errors[0].message : err.message }))
    // .catch(err => ({
    //   success: false,
    //   message: "Issues trying to connect to database",
    //   error: err.errors ? err.errors[0].message : err.message
    // }))
return "it is working properly";
}

module.exports = {
  addSkills,
  addMultipleSkills,
  createUser,
  createUserProfile,
  deleteSkill,
  deleteUserLanguage,
  forgotPassword,
  getSkills,
  getProfile,
  login,
  resendVerificationCode,
  sendVerificationCode,
  updateUserProfile,
  updateSkills,
  updatePassword,
  updateUserLanguages,
  verifyCode,
  sendAccountVerification,
  sendVerificationEmail,
  sendEmail,
  addUser
}
