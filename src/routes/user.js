const express = require('express')

const auth = require('../middlewares/auth')
const { login, logout, list } = require('../controllers/user')

const router = new express.Router()

router.post('/users/login', login)

router.post('/users/logout', auth, logout)

router.get('/users', auth, list)

module.exports = router