const uurchlultDao = require('../daos/uurchlult')

exports.list = async (req, res, next) => {
  try {
    const data = await uurchlultDao.getList()

    res.send(data)
  } catch (err) {
    res
      .status(500)
      .send(err.message)
  }
}