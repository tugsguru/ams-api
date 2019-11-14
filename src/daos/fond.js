const mssql = require('mssql')

exports.getFonds = async ({
  fkod,
  fname,
  startDate,
  endDate,
  currentPage,
  limit,
  sort,
  sortType
}) => {
  const offset = (currentPage - 1) * limit

  let request = new mssql.Request()

  let query = `SELECT [fkod], [fname], [a7], [a8], COUNT(*) OVER() AS total FROM [ams_db].[dbo].[fond] WHERE 1 = 1`

  if (fkod) {
    query = `${query} AND fkod = '${fkod}'`
  }

  if (fname) {
    query = `${query} AND fname = '${fname}'`
  }

  if (startDate) {
    query = `${query} AND a7 >= ${startDate}`
  }

  if (endDate) {
    query = `${query} AND a8 <= ${endDate}`
  }

  sort = sort === 'startDate'
    ? 'a7'
    : sort === 'endDate'
      ? 'a8'
      : sort

  query = `${query} ORDER BY ${sort} ${sortType} OFFSET ${offset} ROWS`

  if (limit !== '-1') {
    query = `${query} FETCH NEXT ${limit} ROWS ONLY`
  }

  const list = await request.query(query)

  const data = { list: list.recordset, total: 0 }

  if (list.recordset && list.recordset.length > 0) {
    data.total = list.recordset[0].total
  }

  return data
}