const sql = require('mssql')

exports.get = async fid => {
  const request = new sql.Request()

  const query = `SELECT [fid], [fkod], [fname], [a1], [a2], [a3], [a4], [a5], [a7], [a8], [a9], [a12], [a12_1], [a14], [a16], [a18], [a19], [a24], [a25], [a26] FROM [ams_db].[dbo].[fond] WHERE [fid] = '${fid}'`

  const response = await request.query(query)

  return response.recordset[0]
}

exports.getList = async ({
  fkod,
  fname,
  a7,
  a8,
  currentPage,
  limit,
  sort,
  sortType
}) => {
  const request = new sql.Request()

  const offset = (currentPage - 1) * limit

  let query = 'SELECT [fid], [fkod], [fname], [a7], [a8], [a9], COUNT(*) OVER() AS total FROM [ams_db].[dbo].[fond] WHERE 1 = 1'

  if (fkod) {
    query = `${query} AND [fkod] = '${fkod}'`
  }

  if (fname) {
    query = `${query} AND [fname] = '${fname}'`
  }

  if (a7) {
    const year = parseInt(a7.split('-')[0]) + 1

    query = `${query} AND ([a7] >= '${a7}' AND [a7] < '${year}-01-01')`
  }

  if (a8) {
    const year = parseInt(a8.split('-')[0]) + 1

    query = `${query} AND ([a8] >= '${a8}' AND [a8] < '${year}-01-01')`
  }

  query = `${query} ORDER BY ${sort} ${sortType} OFFSET ${offset} ROWS`

  if (limit !== -1) {
    query = `${query} FETCH NEXT ${limit} ROWS ONLY`
  }

  const response = await request.query(query)

  let data = { list: response.recordset, total: 0 }

  if (response.recordset && response.recordset.length > 0) {
    data.total = response.recordset[0].total
  }

  return data
}

exports.create = async ({
  fkod,
  fname,
  a1,
  a2,
  a3,
  a5,
  a7,
  a8,
  a9,
  a12,
  a12_1,
  a14,
  a16,
  a19,
  a18,
  a23,
  turulA,
  turulB
}) => {
  const request = new sql.Request()

  try {
    // Хамгийн сүүлийн id-ыг эхний 3 үсгээс салгаж авах
    let query = 'SELECT TOP 1 [fid], [num] = CASE WHEN LEN([fid]) <> 0 THEN CAST(RIGHT([fid], LEN([fid]) - 3) AS int) END FROM [ams_db].[dbo].[fond] ORDER BY [num] DESC'

    const data = await request.query(query)

    let lastId = data.recordset[0].num

    query = `INSERT INTO [ams_db].[dbo].[fond] ([fid], [fkod], [fname], [a1], [a2], [a3], [a4], [a5], [a7], [a8], [a9], [a12], [a12_1], [a14], [a16], [a18], [a19], [a23]) VALUES ('UTA${++lastId}', '${fkod}', '${fname}', '${a1}', '${a2}', '${a3}', '${turulA || turulB}', '${a5}', '${a7}', '${a8}', '${a9}', '${a12}', '${a12_1}', '${a14}', '${a16}', '${a18}', '${a19}', '${a23}')`

    await request.query(query)
  } catch (err) {
    throw new Error('Хөмрөг нэмэх үед алдаа гарлаа.')
  }
}

exports.update = async ({
  fid,
  fkod,
  fname,
  a1,
  a2,
  a7,
  a8
}) => {
  const request = new sql.Request()

  try {
    query = `UPDATE [ams_db].[dbo].[fond] SET [fkod] = '${fkod}', [fname] = '${fname}', [a1] = '${a1}', [a2] = '${a2}', [a7] = '${a7}', [a8] = '${a8}' WHERE [fid] = ${fid}`

    await request.query(query)
  } catch (err) {
    throw new Error('Хөмрөг засах үед алдаа гарлаа.')
  }
}

exports.remove = async fid => {
  const request = new sql.Request()

  try {
    await request.query(`DELETE FROM [ams_db].[dbo].[fond] WHERE [fid] = '${fid}'`)
  } catch (err) {
    throw new Error('Хөмрөг устгах үед алдаа гарлаа.')
  }
}