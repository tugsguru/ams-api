const fondDao = require('../daos/fond')

exports.get = async (req, res, next) => {
  try {
    const { fid } = req.params

    const data = await fondDao.get(fid)

    console.log(data)

    res.send(data)
  } catch (err) {
    res
      .status(500)
      .send(err.message)
  }
}

exports.list = async (req, res, next) => {
  try {
    const {
      fkod, a1, a3, a7, a8, currentPage, limit, sort, sortType
    } = req.query

    const data = await fondDao.getList({
      fkod: fkod || '',
      a1: a1 || '',
      a3: a3 || '',
      a7: a7 || '',
      a8: a8 || '',
      currentPage: Number.isInteger(parseInt(currentPage))
        ? parseInt(currentPage)
        : 1,
      limit: Number.isInteger(parseInt(limit))
        ? parseInt(limit)
        : 10,
      sort: sort || 'fkod',
      sortType: sortType || 'asc'
    })

    res.send(data)
  } catch (err) {
    res
      .status(500)
      .send(err.message)
  }
}

exports.create = async (req, res, next) => {
  try {
    await fondDao.create(req.body)

    return res.status(201).send()
  } catch (err) {
    res
      .status(400)
      .send(err.message)
  }
}

exports.update = async (req, res, next) => {
  try {
    const { fid } = req.params

    await fondDao.update({ fid, ...req.body })

    return res.send()
  } catch (err) {
    res
      .status(400)
      .send(err.message)
  }
}

exports.remove = async (req, res, next) => {
  try {
    const { fid } = req.params

    await fondDao.remove(fid)

    return res.send()
  } catch (err) {
    res
      .status(400)
      .send(err.message)
  }
}