const { Benefit } = require('../apis/database/models')

const benefits = require('../data/benefits.json')

async function createBenefits() {
  await Promise.all(
    benefits.map(name => Benefit.findOrCreate({
      where: { name },
      defaults: {
        name
      }
    }))
  )
}

createBenefits();
