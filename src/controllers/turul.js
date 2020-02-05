const turulDao = require('../daos/turul')

exports.listTurul = async (req, res, next) => {
  try {
    const data = await turulDao.getTurulList()

    res.send(data)
  } catch (err) {
    res
      .status(500)
      .send(err.message)
  }
}

exports.listTurulA = async (req, res, next) => {
  try {
    const data = await turulDao.getTurulAList()

    res.send(data)
  } catch (err) {
    res
      .status(500)
      .send(err.message)
  }
}

exports.listTurulB = async (req, res, next) => {
  try {
    const data = await turulDao.getTurulBList()

    res.send(data)
  } catch (err) {
    res
      .status(500)
      .send(err.message)
  }
}