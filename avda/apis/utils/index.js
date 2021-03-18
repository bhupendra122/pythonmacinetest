const jwt = require("jsonwebtoken");
const settings = require('../settings')
const { loadCompany } = require('./loadCompany');
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const wrap = fn => (...args) => fn(...args).catch(args[2])

const authenticateToken = (req, res, next) => {
  // Gather the jwt access token from the request header
  const token = req.headers['authorization']
  if (token == null) return res.sendStatus(401) // if there isn't any token

  jwt.verify(token, settings.jwtSecret, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next() // pass the execution off to whatever request the client intended
  })
}

module.exports = {
  authenticateToken,
  loadCompany,
  wrap,
  sgMail,
}
