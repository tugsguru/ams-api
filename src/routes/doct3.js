const express = require('express')

const auth = require('../middlewares/auth')
const { list } = require('../controllers/doct3')

const router = new express.Router()

router.get('/doct3s', auth, list)

module.exports = router