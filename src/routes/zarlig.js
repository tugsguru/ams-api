const express = require('express')

const auth = require('../middlewares/auth')
const {
  get,
  listByParents,
  getPeople,
  createPerson,
  updatePerson,
  removePerson,
  getOrgs,
  getGeo,
  create,
  update,
  remove,
} = require('../controllers/zarlig')

const router = new express.Router()

router.get('/zarligs/:npid', auth, get)
router.get('/zarligs/list-by/:fkod/:okod/:l1', auth, listByParents)
router.get('/zarligs/:npid/people', auth, getPeople)
router.post('/zarligs/people', auth, createPerson)
router.patch('/zarligs/:id/people', auth, updatePerson)
router.delete('/zarligs/:id/people', auth, removePerson)
router.get('/zarligs/:npid/orgs', auth, getOrgs)
router.get('/zarligs/:npid/geo', auth, getGeo)
router.post('/zarligs/:fkod/:okod/:l1', auth, create)
router.patch('/zarligs/:npid', auth, update)
router.delete('/zarligs/:npid', auth, remove)

module.exports = router
