const express = require('express')

const auth = require('../middlewares/auth')
const { list } = require('../controllers/ft6')

const router = new express.Router()

router.get('/ft6s', auth, list)

module.exports = router