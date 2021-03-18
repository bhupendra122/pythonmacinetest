const { Language } = require('../apis/database/models')

const languages = require('../apis/utils/languages.json')

async function createLanguages() {
  await Promise.all(
    Object.keys(languages).map(code => Language.findOrCreate({
      where: { code, name: languages[code].name },
      defaults: {
        code,
        name: languages[code].name,
        nativeName: languages[code].nativeName,
      }
    }))
  )
}


createLanguages()