const opisDao = require('../daos/opis')

exports.get = async (req, res, next) => {
  try {
    const { oid } = req.params

    const data = await opisDao.get(oid)

    res.send(data)
  } catch (err) {
    res
      .status(500)
      .send(err.message)
  }
}

exports.listByFond = async (req, res, next) => {
  try {
    const { fkod } = req.params

    if (!fkod) {
      return {
        list: [],
        total: 0
      }
    }

    const {
      oname, g3, g4, g24, currentPage, limit, sort, sortType
    } = req.query

    const data = await opisDao.getListByFond({
      fkod,
      oname: oname || '',
      g3: g3 || '',
      g4: g4 || '',
      g24: g24 || '',
      currentPage: Number.isInteger(parseInt(currentPage))
        ? parseInt(currentPage)
        : 1,
      limit: Number.isInteger(parseInt(limit))
        ? parseInt(limit)
        : 10,
      sort: sort || 'okod',
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
    const { fkod } = req.params

    await opisDao.create({
      fkod,
      ...req.body
    })

    return res.status(201).send()
  } catch (err) {
    res
      .status(400)
      .send(err.message)
  }
}

exports.update = async (req, res, next) => {
  try {
    const { oid } = req.params

    await opisDao.update({ oid, ...req.body })

    return res.send()
  } catch (err) {
    res
      .status(400)
      .send(err.message)
  }
}

exports.remove = async (req, res, next) => {
  try {
    const { oid } = req.params

    await opisDao.remove(oid)

    return res.send()
  } catch (err) {
    res
      .status(400)
      .send(err.message)
  }
}