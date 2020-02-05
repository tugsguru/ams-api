const sql = require('mssql')
const moment = require('moment')

exports.get = async lid => {
  const request = new sql.Request()

  try {
    const query = `SELECT [lid], [l1], [l4], [l5], [l8], [l9], [l10], [l11], [l12], [l13], [l14], [l15], [l16], [l17], [l18], [l19], [l20], [l21], [l22], [l23], [l24], [l26] FROM [ams_db].[dbo].[delo] WHERE [lid] = '${lid}'`

    const response = await request.query(query)

    return response.recordset[0]
  } catch (err) {
    throw new Error(`${lid} кодтой хадгаламжийн нэгжийн мэдээлэл авах үед алдаа гарлаа.`)
  }
}

exports.getListByFondAndOpis = async ({
  fkod,
  okod,
  l4,
  l8,
  l9,
  l11,
  currentPage,
  limit,
  sort,
  sortType
}) => {
  const request = new sql.Request()

  try {
    const offset = (currentPage - 1) * limit

    let query = `SELECT [lid], [l1], [l4], [l8], [l9], [l11], [l14], COUNT(*) OVER() AS total FROM [ams_db].[dbo].[delo] [d] LEFT JOIN [ams_db].[dbo].[opis] [o] ON [d].[opis] = [o].[oid] LEFT JOIN [ams_db].[dbo].[fond] [f] ON [o].[fond] = [f].[fid] WHERE [f].[fkod] = '${fkod}' AND [o].[okod] = '${okod}'`

    if (l4) {
      query = `${query} AND [l4] = '${l4}'`
    }

    if (l8) {
      const minLimit = moment(l8).startOf('days').format('YYYY-MM-DD')
      const maxLimit = moment(minLimit).add(1, 'days').format('YYYY-MM-DD')

      query = `${query} AND ([l8] >= '${minLimit}' AND [l8] < '${maxLimit}')`
    }

    if (l9) {
      const minLimit = moment(l9).startOf('days').format('YYYY-MM-DD')
      const maxLimit = moment(minLimit).add(1, 'days').format('YYYY-MM-DD')

      query = `${query} AND ([l9] >= '${minLimit}' AND [l9] < '${maxLimit}')`
    }

    if (l11) {
      query = `${query} AND [l11] = '${l11}'`
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
    throw new Error('Хадгаламжийн нэгжийн жагсаалт авах үед алдаа гарлаа.')
  }
}

exports.create = async ({
  fkod,
  okod,
  l1,
  l4,
  l5,
  l8,
  l9,
  l10,
  l11,
  l12,
  l13,
  l14,
  l15,
  l16,
  l17,
  l18,
  l19,
  l20,
  l21,
  l22,
  l23,
  l24,
  l26
}) => {
  const request = new sql.Request()

  try {
    // Хамгийн сүүлийн id-ыг эхний 3 үсгээс салгаж авах
    let query = 'SELECT TOP 1 [lid], [num] = CASE WHEN LEN([lid]) <> 0 THEN CAST(RIGHT([lid], LEN([lid]) - 3) AS int) END FROM [ams_db].[dbo].[delo] ORDER BY [num] DESC'

    let data = await request.query(query)

    let lastId = data.recordset[0].num

    query = `SELECT TOP 1 [oid] FROM [ams_db].[dbo].[opis] [o] LEFT JOIN [ams_db].[dbo].[fond] [f] ON [o].[fond] = [f].[fid] WHERE [fkod] = '${fkod}' AND [okod] = '${okod}'`

    data = await request.query(query)

    const oid = data.recordset[0].oid

    query = `INSERT INTO [ams_db].[dbo].[delo] ([lid], [l1], [l4], [l5], [l8], [l9], [l10], [l11], [l12], [l13], [l14], [l15], [l16], [l17], [l18], [l19], [l20], [l21], [l22], [l23], [l24], [l26], [opis]) VALUES ('UTA${++lastId}', '${l1}', '${l4}', '${l5}', '${l8}', '${l9}', '${l10}', '${l11}', '${l12}', '${l13}', '${l14}', '${l15}', '${l16}', '${l17}', '${l18}', '${l19}', '${l20}', '${l21}', '${l22}', '${l23}', '${l24}', '${l26}', '${oid}')`

    await request.query(query)
  } catch (err) {
    throw new Error('Хадгаламжийн нэгж нэмэх үед алдаа гарлаа.')
  }
}

exports.update = async ({
  lid,
  l1,
  l4,
  l5,
  l8,
  l9,
  l10,
  l11,
  l12,
  l13,
  l14,
  l15,
  l16,
  l17,
  l18,
  l19,
  l20,
  l21,
  l22,
  l23,
  l24,
  l26
}) => {
  const request = new sql.Request()

  try {
    query = `UPDATE [ams_db].[dbo].[delo] SET [lid] = '${lid}', [l1] = '${l1}', [l4] = '${l4}', [l5] = '${l5}', [l8] = '${l8}', [l9] = '${l9}', [l10] = '${l10}', [l11] = '${l11}', [l12] = '${l12}', [l13] = '${l13}', [l14] = '${l14}', [l15] = '${l15}', [l16] = '${l16}', [l17] = '${l17}', [l18] = '${l18}', [l19] = '${l19}', [l20] = '${l20}', [l21] = '${l21}', [l22] = '${l22}', [l23] = '${l23}', [l24] = '${l24}', [l26] = '${l26}' WHERE [lid] = '${lid}'`

    await request.query(query)
  } catch (err) {
    throw new Error(`${lid} кодтой хадгаламжийн нэгж засах үед алдаа гарлаа.`)
  }
}

exports.remove = async lid => {
  const request = new sql.Request()

  try {
    const query = `DELETE FROM [ams_db].[dbo].[delo] WHERE [lid] = '${lid}'`

    await request.query(query)
  } catch (err) {
    throw new Error(`${lid} кодтой хадгаламжийн нэгж устгах үед алдаа гарлаа.`)
  }
}

exports.getFilename = async lid => {
  const request = new sql.Request()

  try {
    const query = `SELECT [l26] FROM [ams_db].[dbo].[delo] WHERE [lid] = '${lid}'`

    const response = await request.query(query)

    return response.recordset[0].l26
  } catch (err) {
    throw new Error(`${lid} кодтой хадгаламжийн нэгжийн файлыг авах үед алдаа гарлаа.`)
  }
}