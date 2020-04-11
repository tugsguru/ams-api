const searchDao = require('../daos/search')

exports.search = async (req, res, next) => {
  try {
    const { by, term, currentPage, limit, sort, sortType } = req.query

    const data = await searchDao.search({
      by,
      term,
      currentPage,
      limit,
      sort,
      sortType,
    })

    res.send(data)
  } catch (err) {
    res.status(500).send(err.message)
  }
}
