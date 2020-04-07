const express = require('express')

const auth = require('../middlewares/auth')
const {
  get,
  listByParents,
  getPeople,
  createPerson,
  updatePerson,
  removePerson,
  getGeoList,
  createGeo,
  updateGeo,
  removeGeo,
  getOrgs,
  createOrg,
  updateOrg,
  removeOrg,
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
router.get('/zarligs/:npid/geo', auth, getGeoList)
router.post('/zarligs/geo', auth, createGeo)
router.patch('/zarligs/:id/geo', auth, updateGeo)
router.delete('/zarligs/:id/geo', auth, removeGeo)
router.get('/zarligs/:npid/orgs', auth, getOrgs)
router.post('/zarligs/orgs', auth, createOrg)
router.patch('/zarligs/:id/orgs', auth, updateOrg)
router.delete('/zarligs/:id/orgs', auth, removeOrg)
router.post('/zarligs/:fkod/:okod/:l1', auth, create)
router.patch('/zarligs/:npid', auth, update)
router.delete('/zarligs/:npid', auth, remove)

module.exports = router
