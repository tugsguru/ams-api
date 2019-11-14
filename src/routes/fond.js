const express = require('express')

const auth = require('../middlewares/auth')
const { list } = require('../controllers/fond')

const router = new express.Router()

router.get('/fonds', auth, list)

module.exports = router