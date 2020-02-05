const lt2Dao = require('../daos/lt2')

exports.list = async (req, res, next) => {
  try {
    const data = await lt2Dao.getList()

    res.send(data)
  } catch (err) {
    res
      .status(500)
      .send(err.message)
  }
}