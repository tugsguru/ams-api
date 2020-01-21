const turulDao = require('../daos/turul')

exports.listTurulA = async (req, res, next) => {
  try {
    const data = await turulDao.getTurulAList()

    res.send(data)
  } catch (err) {
    res
      .status(500)
      .send('Нөхөн бүрдүүлэх эх үүсвэрийн (төрөл A) жагсаалт авах үед алдаа гарлаа.')
  }
}

exports.listTurulB = async (req, res, next) => {
  try {
    const data = await turulDao.getTurulBList()

    res.send(data)
  } catch (err) {
    res
      .status(500)
      .send('Нөхөн бүрдүүлэх эх үүсвэрийн (төрөл B) жагсаалт авах үед алдаа гарлаа.')
  }
}