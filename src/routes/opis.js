const express = require('express')

const auth = require('../middlewares/auth')
const {
  get,
  listByFond,
  create,
  update,
  remove
} = require('../controllers/opis')

const router = new express.Router()

router.get('/opis/:oid', auth, get)
router.get('/opis/list-by/:fkod', auth, listByFond)
router.post('/opis/:fkod', auth, create)
router.patch('/opis/:oid', auth, update)
router.delete('/opis/:oid', auth, remove)

module.exports = router