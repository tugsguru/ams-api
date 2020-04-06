const sql = require('mssql')

exports.get = async oid => {
  const request = new sql.Request()

  try {
    const query = `SELECT [oid], [okod], [oname], [g1], [g3], [g4], [g6], [g13], [g14], [g17], [g24] FROM [ams_db].[dbo].[opis] WHERE [oid] = '${oid}'`

    const response = await request.query(query)

    return response.recordset[0]
  } catch (err) {
    throw new Error(`${oid} кодтой дансны мэдээлэл авах үед алдаа гарлаа.`)
  }
}

exports.getListByFond = async ({
  fkod,
  oname,
  g3,
  g4,
  g24,
  currentPage,
  limit,
  sort,
  sortType
}) => {
  const request = new sql.Request()

  try {
    const offset = (currentPage - 1) * limit

    let query = `SELECT [oid], [okod], [oname], [g3], [g4], [g14], [g24], COUNT(*) OVER() AS total FROM [ams_db].[dbo].[opis] [o] LEFT JOIN [ams_db].[dbo].[fond] [f] ON [o].[fond] = [f].[fid] WHERE [f].[fkod] = '${fkod}'`

    if (oname) {
      query = `${query} AND [oname] LIKE '%${oname}%'`
    }

    if (g3) {
      query = `${query} AND [g3] = '${g3}'`
    }

    if (g4) {
      query = `${query} AND [g4] = '${g4}'`
    }

    if (g24) {
      query = `${query} AND [g24] = '${g24}'`
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
    throw new Error('Дансны жагсаалт авах үед алдаа гарлаа.')
  }
}

exports.create = async ({
  fkod,
  okod,
  oname,
  g1,
  g3,
  g4,
  g6,
  g13,
  g14,
  g17,
  g24
}) => {
  const request = new sql.Request()

  try {
    // Хамгийн сүүлийн id-ыг эхний 3 үсгээс салгаж авах
    let query = 'SELECT TOP 1 [oid], [num] = CASE WHEN LEN([oid]) <> 0 THEN CAST(RIGHT([oid], LEN([oid]) - 3) AS int) END FROM [ams_db].[dbo].[opis] ORDER BY [num] DESC'

    let data = await request.query(query)

    let lastId = data.recordset[0].num

    query = `SELECT TOP 1 [fid] FROM [ams_db].[dbo].[fond] WHERE [fkod] = '${fkod}'`

    data = await request.query(query)

    const fid = data.recordset[0].fid

    query = `INSERT INTO [ams_db].[dbo].[opis] ([oid], [okod], [fond], [oname], [g1], [g3], [g4], [g6], [g13], [g14], [g17], [g24]) VALUES ('UTA${++lastId}', '${okod}', '${fid}', '${oname}', '${g1}', '${g3}', '${g4}', '${g6}', '${g13}', '${g14}', '${g17}', '${g24}')`

    await request.query(query)
  } catch (err) {
    throw new Error('Данс нэмэх үед алдаа гарлаа.')
  }
}

exports.update = async ({
  oid,
  okod,
  oname,
  g1,
  g3,
  g4,
  g6,
  g13,
  g14,
  g17,
  g24
}) => {
  const request = new sql.Request()

  try {
    query = `UPDATE [ams_db].[dbo].[opis] SET [okod] = '${okod}', [oname] = '${oname}', [g1] = '${g1}', [g3] = '${g3}', [g4] = '${g4}', [g6] = '${g6}', [g13] = '${g13}', [g14] = '${g14}', [g17] = '${g17}', [g24] = '${g24}' WHERE [oid] = '${oid}'`

    await request.query(query)
  } catch (err) {
    throw new Error(`${oid} кодтой данс засах үед алдаа гарлаа.`)
  }
}

exports.remove = async oid => {
  const request = new sql.Request()

  try {
    await request.query(`DELETE FROM [ams_db].[dbo].[opis] WHERE [oid] = '${oid}'`)
  } catch (err) {
    throw new Error(`${oid} кодтой данс устгах үед алдаа гарлаа.`)
  }
}