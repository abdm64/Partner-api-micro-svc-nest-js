const dbssController = require('../controllers/dbss.controller')

const router = require('express').Router();

router.get('/info/:msisdn', dbssController.getDbssInfo)

module.exports = router;