const { AppCertification } = require('../apis/database/models')

const certifications = require('../data/certifications.json')

async function createCertifications() {
  await Promise.all(
    certifications.map(certification => AppCertification.findOrCreate({
      where: { name: certification.name },
      defaults: certification
    }))
  )
}


createCertifications()