class ResourceNotFound extends Error { }

const { Sequelize } = require('../database/models')
const { toError } = require('../serializers')

const middleware = (err, req, res, next) => {
  if (err instanceof Sequelize.ValidationError) {
    res.status(422)
      .json({
        success: false,
        errors: toError(err)
      })
  } else if (err instanceof ResourceNotFound) {
    res.status(404)
      .json({
        success: false,
        errors: {
          message: err.message
        }
      })
  } else {
    res.status(500)
      .json({
        success: false,
        errors: {
          message: err.message
        }
      })
  }
}

module.exports = {
  ResourceNotFound,
  middleware,
}
