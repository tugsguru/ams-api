const express = require('express')

const auth = require('../middlewares/auth')
const { list } = require('../controllers/hnzereg')

const router = new express.Router()

router.get('/hnzeregs', auth, list)

module.exports = router