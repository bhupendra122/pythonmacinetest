const router = require('express').Router();
const {
  pickBy
} = require('lodash')
const upload = require('./utils/upload');

const { wrap, authenticateToken } = require('./utils')

const settings = require('./settings')

router.use('/languages', require('./languages'))
router.use('/certifications', require('./appCertifications'))
router.use('/users', require('./users'));
router.use('/company', authenticateToken, require('./company'));
router.use('/jobs', authenticateToken, require('./jobs'));
router.use('/benefits', authenticateToken, require('./benefits'));
router.post('/upload', upload.single('image'), async (req, res) => res.send({ image: req.file }));


router.get('/settings', wrap(async function (req, res) {
  const frontEndKeys = ["desiredSalary", "jobTypes", "languageLevel"]
  const result = pickBy(settings, (value, key) => frontEndKeys.includes(key));
  res.json(result)
}));
module.exports = router;
