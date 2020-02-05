const doct3Dao = require('../daos/doct3')

exports.list = async (req, res, next) => {
  try {
    const data = await doct3Dao.getList()

    res.send(data)
  } catch (err) {
    res
      .status(500)
      .send(err.message)
  }
}