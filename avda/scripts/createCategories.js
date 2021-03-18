const { Category } = require('../apis/database/models')

const categories = require('./professions.json')

async function createCateegories() {
  await Promise.all(
    categories.map(title => Category.findOrCreate({
      where: { title },
      defaults: {
        title
      }
    }))
  )
}


createCateegories()