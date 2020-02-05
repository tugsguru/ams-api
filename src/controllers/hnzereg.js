const hnzeregDao = require('../daos/hnzereg')

exports.list = async (req, res, next) => {
  try {
    const data = await hnzeregDao.getList()

    res.send(data)
  } catch (err) {
    res
      .status(500)
      .send(err.message)
  }
}