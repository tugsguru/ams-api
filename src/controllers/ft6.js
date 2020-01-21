const ft6Dao = require('../daos/ft6')

exports.list = async (req, res, next) => {
  try {
    const data = await ft6Dao.getList()

    res.send(data)
  } catch (err) {
    res
      .status(500)
      .send('Өмчийн хэлбэрийн жагсаалт авах үед алдаа гарлаа.')
  }
}