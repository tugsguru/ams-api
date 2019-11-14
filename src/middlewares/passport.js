const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const userDao = require('../daos/user')

authenticateUser = async (jwtPayload, done) => {
  try {
    const user = await userDao.getUser(jwtPayload.uid)

    if (!user) {
      return done(
        null,
        false,
        { message: 'Хэрэглэгчийн нэр эсвэл нууц үг буруу байна.' }
      )
    }

    return done(null, user)
  } catch (err) {
    return done(err, false)
  }
}

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}

passport.use(new JwtStrategy(options, authenticateUser))

module.exports = null