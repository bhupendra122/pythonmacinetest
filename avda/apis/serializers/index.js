const _ = require('lodash')
const moment = require('moment')

const fontawesome = require('@fortawesome/fontawesome')
const solidIcons = require('@fortawesome/fontawesome-pro-solid').default
const lightIcons = require('@fortawesome/fontawesome-pro-light').default
const brandIcons = require('@fortawesome/fontawesome-free-brands').default

fontawesome.library.add(solidIcons, lightIcons, brandIcons)

const toError = err => {
  // Convert complex keys to simplified keys
  let re = new RegExp(/\w+\((\w+)\:\:\w+\)/)
  let errors = {}

  err.errors.forEach(error => {
    let path = error.path.replace(re, '$1')
    errors[path] = error.message.replace(re, '$1')
  })

  return errors
}


module.exports = {
  toError,
}
