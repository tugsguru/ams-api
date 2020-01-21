const express = require('express')

const auth = require('../middlewares/auth')
const { listTurulA, listTurulB } = require('../controllers/turul')

const router = new express.Router()

router.get('/turulas', auth, listTurulA)

router.get('/turulbs', auth, listTurulB)

module.exports = router