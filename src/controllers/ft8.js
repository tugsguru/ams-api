const ft8Dao = require('../daos/ft8')

exports.list = async (req, res, next) => {
  try {
    const data = await ft8Dao.getList()

    res.send(data)
  } catch (err) {
    res
      .status(500)
      .send('Хөмрөгийн хэлбэрийн жагсаалт авах үед алдаа гарлаа.')
  }
}