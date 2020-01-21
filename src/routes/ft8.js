const express = require('express')

const auth = require('../middlewares/auth')
const { list } = require('../controllers/ft8')

const router = new express.Router()

router.get('/ft8s', auth, list)

module.exports = router