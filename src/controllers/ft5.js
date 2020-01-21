const ft5Dao = require('../daos/ft5')

exports.list = async (req, res, next) => {
  try {
    const data = await ft5Dao.getList()

    res.send(data)
  } catch (err) {
    res
      .status(500)
      .send('Хөмрөгийн төлөв байдлын жагсаалт авах үед алдаа гарлаа.')
  }
}