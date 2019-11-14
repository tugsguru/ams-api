const jwt = require('jsonwebtoken')

const userDao = require('../daos/user')

const jwtSign = uid => {
  const ONE_WEEK = 60 * 60 * 24 * 7

  return jwt.sign({ uid }, process.env.JWT_SECRET, {
    expiresIn: ONE_WEEK
  })
}

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body

    const user = await userDao.getLoginUser(username, password)

    if (!user) {
      return res
        .status(401)
        .send('Хэрэглэгчийн нэр эсвэл нууц үг буруу байна.')
    }

    const userJson = JSON.parse(JSON.stringify(user))

    res.send({
      user: userJson,
      token: jwtSign(userJson.uid)
    })
  } catch (err) {
    res.status(400).send()
  }
}

exports.logout = async (req, res, next) => {
  try {
    res.send()
  } catch (err) {
    res.status(500).send()
  }
}

exports.list = async (req, res, next) => {
  try {
    let { currentPage, limit, sort, sortType } = req.query

    currentPage = Number.isInteger(currentPage)
      ? parseInt(currentPage)
      : 1
    limit = Number.isInteger(limit)
      ? parseInt(limit)
      : 10
    sort = sort || 'date_inserted'
    sortType = sortType || 'desc'

    const data = await userDao.getUsers({
      currentPage, limit, sort, sortType
    })

    res.send(data)
  } catch (err) {
    res
      .status(500)
      .send('Хэрэглэгчийн жагсаалт авах үед алдаа гарлаа.')
  }
}