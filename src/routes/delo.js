const express = require('express')
const multer = require('multer')

const auth = require('../middlewares/auth')
const {
  get,
  listByFondAndOpis,
  create,
  update,
  remove
} = require('../controllers/delo')

const router = new express.Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(undefined, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(undefined, file.originalname)
  }
})

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 30 // 30MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Зөвхөн зураг хадгалах боломжтой.'))
      // return cb(new Error('Зөвхөн PDF өргөтгөлтэй файл хадгалах боломжтой.'))
    }

    cb(undefined, true)
  }
})

router.get('/delos/:lid', auth, get)
router.get('/delos/list-by/:fkod/:okod', auth, listByFondAndOpis)
router.post(
  '/delos/:fkod/:okod',
  auth,
  upload.single('file'),
  create,
  (err, req, res, next) => {
    res.status(400).send({ msg: err.message })
  }
)
router.patch('/delos/:lid', auth, update)
router.delete('/delos/:lid', auth, remove)

module.exports = router