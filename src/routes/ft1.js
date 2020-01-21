const express = require('express')

const auth = require('../middlewares/auth')
const { list } = require('../controllers/ft1')

const router = new express.Router()

router.get('/ft1s', auth, list)

module.exports = router