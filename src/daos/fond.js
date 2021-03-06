const sql = require('mssql')

exports.get = async fid => {
  const request = new sql.Request()

  try {
    const query = `SELECT [fid], [fkod], [fname], [a1], [a2], [a3], [a4], [a5], [a7], [a8], [a9], [a12], [a12_1], [a14], [a16], [a18], [a19], [a24], [a25], [a26] FROM [ams_db].[dbo].[fond] WHERE [fid] = '${fid}'`

    const response = await request.query(query)

    return response.recordset[0]
  } catch (err) {
    throw new Error(`${fid} кодтой хөмрөгийн мэдээлэл авах үед алдаа гарлаа.`)
  }
}

exports.getList = async ({
  fkod,
  a1,
  a3,
  a7,
  a8,
  currentPage,
  limit,
  sort,
  sortType
}) => {
  const request = new sql.Request()

  try {
    const offset = (currentPage - 1) * limit

    let query = 'SELECT [fid], [fkod], [a1], [a3], [a7], [a8], [a18], COUNT(*) OVER() AS total FROM [ams_db].[dbo].[fond] WHERE 1 = 1'

    if (fkod) {
      query = `${query} AND [fkod] = '${fkod}'`
    }

    if (a1) {
      query = `${query} AND [a1] LIKE '%${a1}%'`
    }

    if (a3) {
      query = `${query} AND [a3] = '${a3}'`
    }

    if (a7) {
      query = `${query} AND [a7] = '${a7}'`
    }

    if (a8) {
      query = `${query} AND [a8] = '${a8}'`
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
  } catch (err) {
    throw new Error('Хөмрөгийн жагсаалт авах үед алдаа гарлаа.')
  }
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
  a3,
  a4,
  a5,
  a7,
  a8,
  a9,
  a12,
  a12_1,
  a14,
  a16,
  a18,
  a19,
  a23
}) => {
  const request = new sql.Request()

  try {
    query = `UPDATE [ams_db].[dbo].[fond] SET [fkod] = '${fkod}', [fname] = '${fname}', [a1] = '${a1}', [a2] = '${a2}', [a3] = '${a3}', [a4] = '${a4}', [a5] = '${a5}', [a7] = '${a7}', [a8] = '${a8}', [a9] = '${a9}', [a12] = '${a12}', [a12_1] = '${a12_1}', [a14] = '${a14}', [a16] = '${a16}', [a18] = '${a18}', [a19] = '${a19}', [a23] = '${a23}' WHERE [fid] = '${fid}'`

    await request.query(query)
  } catch (err) {
    throw new Error(`${fid} кодтой хөмрөг засах үед алдаа гарлаа.`)
  }
}

exports.remove = async fid => {
  const request = new sql.Request()

  try {
    await request.query(`DELETE FROM [ams_db].[dbo].[fond] WHERE [fid] = '${fid}'`)
  } catch (err) {
    throw new Error(`${fid} кодтой хөмрөг устгах үед алдаа гарлаа.`)
  }
}