const sql = require('mssql')

exports.search = async ({ by, term, currentPage, limit, sort, sortType }) => {
  const request = new sql.Request()

  const offset = (currentPage - 1) * limit
  let query = ''

  switch (by) {
    // Агуулга
    case 'p2':
    // Баримтын дугаар
    case 'p7':
      query = `SELECT [f].[fkod], [o].[okod], [d].[l1], [npid], [p2], [p7], [p8], [p4], COUNT(*) OVER() AS total FROM [ams_db].[dbo].[zarlig] [z] LEFT JOIN [ams_db].[dbo].[delo] [d] ON [z].[pid] = [d].[lid] LEFT JOIN [ams_db].[dbo].[opis] [o] ON [d].[opis] = [o].[oid] LEFT JOIN [ams_db].[dbo].[fond] [f] ON [o].[fond] = [f].[fid] WHERE [${by}] LIKE N'%${term}%'`
      break
    // Хүний нэр
    case 'name':
      query = `SELECT [n].[n], [f].[fkod], [o].[okod], [d].[l1], [npid], [p2], [p7], [p8], [p4], COUNT(*) OVER() AS total FROM [ams_db].[dbo].[zarlig] [z] LEFT JOIN [ams_db].[dbo].[delo] [d] ON [z].[pid] = [d].[lid] LEFT JOIN [ams_db].[dbo].[opis] [o] ON [d].[opis] = [o].[oid] LEFT JOIN [ams_db].[dbo].[fond] [f] ON [o].[fond] = [f].[fid] LEFT JOIN [ams_db].[dbo].[t_name] [n] ON [z].[npid] = [n].[tid] WHERE [n].[n] LIKE N'%${term}%'`
      break
    // Байгууллагын нэр
    case 'organ':
      query = `SELECT [org].[n], [f].[fkod], [o].[okod], [d].[l1], [npid], [p2], [p7], [p8], [p4], COUNT(*) OVER() AS total FROM [ams_db].[dbo].[zarlig] [z] LEFT JOIN [ams_db].[dbo].[delo] [d] ON [z].[pid] = [d].[lid] LEFT JOIN [ams_db].[dbo].[opis] [o] ON [d].[opis] = [o].[oid] LEFT JOIN [ams_db].[dbo].[fond] [f] ON [o].[fond] = [f].[fid] LEFT JOIN [ams_db].[dbo].[t_organ] [org] ON [z].[npid] = [org].[tid] WHERE [org].[n] LIKE N'%${term}%'`
      break
    // Газар орны нэр
    case 'geograf':
      query = `SELECT [g].[n], [f].[fkod], [o].[okod], [d].[l1], [npid], [p2], [p7], [p8], [p4], COUNT(*) OVER() AS total FROM [ams_db].[dbo].[zarlig] [z] LEFT JOIN [ams_db].[dbo].[delo] [d] ON [z].[pid] = [d].[lid] LEFT JOIN [ams_db].[dbo].[opis] [o] ON [d].[opis] = [o].[oid] LEFT JOIN [ams_db].[dbo].[fond] [f] ON [o].[fond] = [f].[fid] LEFT JOIN [ams_db].[dbo].[t_geograf] [g] ON [z].[npid] = [g].[tid] WHERE [g].[n] LIKE N'%${term}%'`
      break
    default:
      break
  }

  query = `${query} ORDER BY ${sort} ${sortType} OFFSET ${offset} ROWS`

  if (limit !== -1) {
    query = `${query} FETCH NEXT ${limit} ROWS ONLY`
  }

  console.log(query)

  try {
    const response = await request.query(query)

    let data = { list: response.recordset, total: 0 }

    if (response.recordset && response.recordset.length > 0) {
      data.total = response.recordset[0].total
    }

    return data
  } catch (err) {
    throw new Error('Мэдээлэл хайх үед алдаа гарлаа.')
  }
}
