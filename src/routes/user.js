const express = require('express')

const auth = require('../middlewares/auth')
const { login, list } = require('../controllers/user')

const router = new express.Router()

router.post('/users/login', login)

router.get('/users', auth, list, (err, req, res, next) => {
  res.status(400).send({ error: err.message })
})

module.exports = router