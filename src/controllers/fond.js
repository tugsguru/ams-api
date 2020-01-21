const fondDao = require('../daos/fond')

exports.get = async (req, res, next) => {
  try {
    const { fid } = req.params

    const data = await fondDao.get(fid)

    res.send(data)
  } catch (err) {
    res
      .status(500)
      .send('Хөмрөгийн мэдээлэл авах үед алдаа гарлаа.')
  }
}

exports.list = async (req, res, next) => {
  try {
    const {
      fkod, fname, a7, a8, currentPage, limit, sort, sortType
    } = req.query

    const data = await fondDao.getList({
      fkod: fkod || '',
      fname: fname || '',
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
      .send('Хөмрөгийн жагсаалт авах үед алдаа гарлаа.')
  }
}

exports.create = async (req, res, next) => {
  try {
    await fondDao.create(req.body)

    return res.status(201).send()
  } catch (err) {
    res
      .status(400)
      .send('Хөмрөг нэмэх үед алдаа гарлаа.')
  }
}

exports.update = async (req, res, next) => {
  try {
    const { fid } = req.params

    await fondDao.update(fid, req.body)

    return res.send()
  } catch (err) {
    res
      .status(400)
      .send('Хөмрөг засах үед алдаа гарлаа.')
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
      .send('Хөмрөг устгах үед алдаа гарлаа.')
  }
}