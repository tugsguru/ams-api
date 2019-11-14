const fondDao = require('../daos/fond')

exports.list = async (req, res, next) => {
  try {
    const qs = { ...req.query }

    let {
      fkod, fname, startDate, endDate, currentPage, limit, sort, sortType
    } = qs

    fkod = fkod || ''
    fname = fname || ''
    startDate = startDate || ''
    endDate = endDate || ''
    currentPage = Number.isInteger(parseInt(currentPage))
      ? parseInt(currentPage)
      : 1
    limit = Number.isInteger(parseInt(limit))
      ? parseInt(limit)
      : 10
    sort = sort || 'fkod'
    sortType = sortType || 'asc'

    const data = await fondDao.getFonds(qs)

    res.send(data)
  } catch (err) {
    res
      .status(500)
      .send('Хөмрөгийн жагсаалт авах үед алдаа гарлаа.')
  }
}