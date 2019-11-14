const passport = require('passport')

const auth = (req, res, next) => {
  passport.authenticate('jwt', (err, user) => {
    if (err) {
      res.status(401).send(err)
    } else if (!user) {
      throw new Error('Хэрэглэгчийн нэр эсвэл нууц үг буруу байна.')
    } else {
      req.user = user
      next()
    }
  })(req, res, next)
}

module.exports = auth