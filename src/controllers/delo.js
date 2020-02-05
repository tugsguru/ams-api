const fs = require('fs')

const deloDao = require('../daos/delo')

exports.get = async (req, res, next) => {
  try {
    const { lid } = req.params

    const data = await deloDao.get(lid)

    res.send(data)
  } catch (err) {
    res
      .status(500)
      .send(err.message)
  }
}

exports.listByFondAndOpis = async (req, res, next) => {
  try {
    const { fkod, okod } = req.params

    if (!fkod || !okod) {
      return {
        list: [],
        total: 0
      }
    }

    const {
      l4, l8, l9, l11, currentPage, limit, sort, sortType
    } = req.query

    const data = await deloDao.getListByFondAndOpis({
      fkod,
      okod,
      l4: l4 || '',
      l8: l8 || '',
      l9: l9 || '',
      l11: l11 || '',
      currentPage: Number.isInteger(parseInt(currentPage))
        ? parseInt(currentPage)
        : 1,
      limit: Number.isInteger(parseInt(limit))
        ? parseInt(limit)
        : 10,
      sort: sort || 'l1',
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
    const { fkod, okod } = req.params

    await deloDao.create({
      fkod,
      okod,
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
    const { lid } = req.params

    await deloDao.update({ lid, ...req.body })

    return res.send()
  } catch (err) {
    res
      .status(400)
      .send(err.message)
  }
}

exports.remove = async (req, res, next) => {
  try {
    const { lid } = req.params

    const filename = await deloDao.getFilename(lid)

    if (filename) {
      fs.unlink(`uploads/${filename}`, err => {
        if (err) {
          throw new Error('Файл устгах үед алдаа гарлаа.')
        }
      })
    }

    await deloDao.remove(lid)

    return res.send()
  } catch (err) {
    res
      .status(400)
      .send(err.message)
  }
}