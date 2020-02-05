const express = require('express')

const auth = require('../middlewares/auth')
const { search } = require('../controllers/search')

const router = new express.Router()

router.get('/search', auth, search)

module.exports = router