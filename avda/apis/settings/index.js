

const desiredSalary = [
  {
    id: 1,
    name: "Annual",
  },
  {
    id: 2,
    name: "Per Hour",
  },
  {
    id: 3,
    name: "Per Week",
  },
  {
    id: 4,
    name: "Per Month",
  },
]

const jobTypes = [
  {
    id: 1,
    name: "Full Time",
  },
  {
    id: 2,
    name: "Part Time",
  },
  {
    id: 3,
    name: "Temp",
  },
  {
    id: 4,
    name: "Contract",
  },
  {
    id: 5,
    name: "Internship",
  },
]

const languageLevel = ['Basic', 'Advanced', 'Conversational', 'Fluent', 'Native or Bilingual']

module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3006,
  jwtSecret: process.env.JWT_SECRET || 'secret',
  images: {
    accessKeyId: process.env.IMAGES_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.IMAGES_SECRET_ACCESS_KEY || '',
    region: process.env.IMAGES_REGION,
    bucket: process.env.IMAGES_BUCKET || '',
  },
  desiredSalary,
  jobTypes,
  languageLevel,
}
