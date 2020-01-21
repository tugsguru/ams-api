const express = require('express')

const auth = require('../middlewares/auth')
const { list } = require('../controllers/ft5')

const router = new express.Router()

router.get('/ft5s', auth, list)

module.exports = router