const express = require('express')
const multer = require('multer')

const auth = require('../middlewares/auth')

const router = new express.Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(undefined, `uploads/${req.params.dirname}`)
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

router.post(
  '/upload/:dirname',
  auth,
  upload.single('file'),
  (req, res, next) => {
    return res.send()
  },
  (err, req, res, next) => {
    res.status(400).send({ msg: err.message })
  }
)

module.exports = router