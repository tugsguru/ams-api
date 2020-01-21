const express = require('express')

const auth = require('../middlewares/auth')
const {
  get,
  list,
  create,
  update,
  remove
} = require('../controllers/fond')

const router = new express.Router()

router.get('/fonds/:fid', auth, get)
router.get('/fonds', auth, list)
router.post('/fonds', auth, create)
router.patch('/fonds/:fid', auth, update)
router.delete('/fonds/:fid', auth, remove)

module.exports = router