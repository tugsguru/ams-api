const express = require('express')

const auth = require('../middlewares/auth')
const { listTurul, listTurulA, listTurulB } = require('../controllers/turul')

const router = new express.Router()

router.get('/turuls', auth, listTurul)

router.get('/turulas', auth, listTurulA)

router.get('/turulbs', auth, listTurulB)

module.exports = router