const ft1Dao = require('../daos/ft1')

exports.list = async (req, res, next) => {
  try {
    const data = await ft1Dao.getList()

    res.send(data)
  } catch (err) {
    res
      .status(500)
      .send('Түүхэн үеийн жагсаалт авах үед алдаа гарлаа.')
  }
}