const express = require('express')

const auth = require('../middlewares/auth')
const { list } = require('../controllers/nuutsbaidal')

const router = new express.Router()

router.get('/nuutsbaidals', auth, list)

module.exports = router