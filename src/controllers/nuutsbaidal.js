const nuutsbaidalDao = require('../daos/nuutsbaidal')

exports.list = async (req, res, next) => {
  try {
    const data = await nuutsbaidalDao.getList()

    res.send(data)
  } catch (err) {
    res
      .status(500)
      .send(err.message)
  }
}