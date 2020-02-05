const searchDao = require('../daos/search')

exports.search = async (req, res, next) => {
  try {
    const {
      oname, g3, g4, g24, currentPage, limit, sort, sortType
    } = req.query

    const data = await searchDao.search({
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