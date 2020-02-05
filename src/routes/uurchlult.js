const express = require('express')

const auth = require('../middlewares/auth')
const { list } = require('../controllers/uurchlult')

const router = new express.Router()

router.get('/uurchlults', auth, list)

module.exports = router