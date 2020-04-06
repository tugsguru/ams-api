const express = require('express')

const auth = require('../middlewares/auth')
const {
  get,
  listByFondAndOpis,
  create,
  update,
  remove
} = require('../controllers/delo')

const router = new express.Router()

router.get('/delos/:lid', auth, get)
router.get('/delos/list-by/:fkod/:okod', auth, listByFondAndOpis)
router.post('/delos/:fkod/:okod', auth, create)
router.patch('/delos/:lid', auth, update)
router.delete('/delos/:lid', auth, remove)

module.exports = router