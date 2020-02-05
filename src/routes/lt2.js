const express = require('express')

const auth = require('../middlewares/auth')
const { list } = require('../controllers/lt2')

const router = new express.Router()

router.get('/lt2s', auth, list)

module.exports = router