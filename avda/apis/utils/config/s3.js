const AWS = require('aws-sdk')
const settings = require('../../settings')

const credentials = new AWS.Credentials({
  accessKeyId: settings.images.accessKeyId,
  secretAccessKey: settings.images.secretAccessKey
})

const s3 = new AWS.S3({
  credentials: credentials,
  region: settings.images.region,
})

module.exports = s3
