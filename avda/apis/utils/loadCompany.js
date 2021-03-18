
const {
  companyHelpers
} = require('../helpers')


const loadCompany = async (req, res, next) => {
  const {
    params: {
      companyId
    }
  } = req
  // const company = await companyHelpers.getCompanyDetails(companyId)

  // if (!company || !company == null) return res.sendStatus(404)

  req.companyId = companyId
  next()
}
module.exports = {
  loadCompany
}
