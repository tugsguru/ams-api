const sql = require('mssql')
const moment = require('moment')

exports.get = async (npid) => {
  const request = new sql.Request()

  try {
    const query = `SELECT [npid], [p1], [p2], [p3], [p4], [p6], [p7], [p8], [p9], [p10], [p11], [wname] FROM [ams_db].[dbo].[zarlig] [z] LEFT JOIN [ams_db].[dbo].[users] [u] ON [z].[p5] = [u].[uid] WHERE [npid] = '${npid}'`

    const response = await request.query(query)

    return response.recordset[0]
  } catch (err) {
    throw new Error(`${npid} кодтой баримтын мэдээлэл авах үед алдаа гарлаа.`)
  }
}

exports.getListByParents = async ({
  fkod,
  okod,
  l1,
  p2,
  p3,
  p4,
  p7,
  p8,
  p10,
  wname,
  currentPage,
  limit,
  sort,
  sortType,
}) => {
  const request = new sql.Request()

  try {
    const offset = (currentPage - 1) * limit

    let query = `SELECT [npid], [p2], [p3], [p4], [p7], [p8], [p10], [p11], [wname], COUNT(*) OVER() AS total FROM [ams_db].[dbo].[zarlig] [z] LEFT JOIN [ams_db].[dbo].[delo] [d] ON [z].pid = [d].[lid] LEFT JOIN [ams_db].[dbo].[opis] [o] ON [d].[opis] = [o].[oid] LEFT JOIN [ams_db].[dbo].[fond] [f] ON [o].[fond] = [f].[fid] LEFT JOIN [ams_db].[dbo].[users] [u] ON [z].[p5] = [u].[uid] WHERE [f].[fkod] = '${fkod}' AND [o].[okod] = '${okod}' AND [d].[l1] = '${l1}'`

    if (p2) {
      query = `${query} AND [p2] LIKE '%${p2}%'`
    }

    if (p3) {
      query = `${query} AND [p3] LIKE '%${p3}%'`
    }

    if (p4) {
      query = `${query} AND CONVERT(varchar, [p4], 23) = '${p4}'`
    }

    if (p7) {
      query = `${query} AND [p7] = '${p7}'`
    }

    if (p8) {
      query = `${query} AND [p8] = '${p8}'`
    }

    if (p10) {
      query = `${query} AND CONVERT(varchar, [p10], 23) = '${p10}'`
    }

    if (wname) {
      query = `${query} AND [wname] LIKE '%${wname}%'`
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
    throw new Error('Баримтын жагсаалт авах үед алдаа гарлаа.')
  }
}

exports.getPeople = async (npid) => {
  const request = new sql.Request()

  try {
    const query = `SELECT [kid], [tid], [n] FROM [ams_db].[dbo].[t_name] WHERE [tid] = '${npid}'`

    const response = await request.query(query)

    return response.recordset
  } catch (err) {
    throw new Error(
      `${npid} кодтой баримтанд харгалзах хүмүүсийн мэдээлэл авах үед алдаа гарлаа.`
    )
  }
}

exports.createPerson = async ({ tid, n }) => {
  const request = new sql.Request()

  try {
    query = `INSERT INTO [ams_db].[dbo].[t_name] ([tid], [n]) VALUES ('${tid}', '${n}')`

    await request.query(query)
  } catch (err) {
    throw new Error('Хүн нэмэх үед алдаа гарлаа.')
  }
}

exports.updatePerson = async ({ id, n }) => {
  const request = new sql.Request()

  try {
    query = `UPDATE [ams_db].[dbo].[t_name] SET [n] = '${n}' WHERE [kid] = '${id}'`

    await request.query(query)
  } catch (err) {
    throw new Error(`${kid} кодтой хүний мэдээлэл засах үед алдаа гарлаа.`)
  }
}

exports.removePerson = async (id) => {
  const request = new sql.Request()

  try {
    const query = `DELETE FROM [ams_db].[dbo].[t_name] WHERE [kid] = '${id}'`

    await request.query(query)
  } catch (err) {
    throw new Error(`${id} кодтой хүн устгах үед алдаа гарлаа.`)
  }
}

exports.getGeoList = async (npid) => {
  const request = new sql.Request()

  try {
    const query = `SELECT [kid], [tid], [n] FROM [ams_db].[dbo].[t_geograf] WHERE [tid] = '${npid}'`

    const response = await request.query(query)

    return response.recordset
  } catch (err) {
    throw new Error(
      `${npid} кодтой баримтанд харгалзах байгууллагасийн мэдээлэл авах үед алдаа гарлаа.`
    )
  }
}

exports.createGeo = async ({ tid, n }) => {
  const request = new sql.Request()

  try {
    query = `INSERT INTO [ams_db].[dbo].[t_geograf] ([tid], [n]) VALUES ('${tid}', '${n}')`

    await request.query(query)
  } catch (err) {
    throw new Error('байгууллага нэмэх үед алдаа гарлаа.')
  }
}

exports.updateGeo = async ({ id, n }) => {
  const request = new sql.Request()

  try {
    query = `UPDATE [ams_db].[dbo].[t_geograf] SET [n] = '${n}' WHERE [kid] = '${id}'`

    await request.query(query)
  } catch (err) {
    throw new Error(
      `${kid} кодтой байгууллагаийн мэдээлэл засах үед алдаа гарлаа.`
    )
  }
}

exports.removeGeo = async (id) => {
  const request = new sql.Request()

  try {
    const query = `DELETE FROM [ams_db].[dbo].[t_geograf] WHERE [kid] = '${id}'`

    await request.query(query)
  } catch (err) {
    throw new Error(`${id} кодтой байгууллага устгах үед алдаа гарлаа.`)
  }
}

exports.getOrgs = async (npid) => {
  const request = new sql.Request()

  try {
    const query = `SELECT [kid], [tid], [n] FROM [ams_db].[dbo].[t_organ] WHERE [tid] = '${npid}'`

    const response = await request.query(query)

    return response.recordset
  } catch (err) {
    throw new Error(
      `${npid} кодтой баримтанд харгалзах байгууллагын мэдээлэл авах үед алдаа гарлаа.`
    )
  }
}

exports.createOrg = async ({ tid, n }) => {
  const request = new sql.Request()

  try {
    query = `INSERT INTO [ams_db].[dbo].[t_organ] ([tid], [n]) VALUES ('${tid}', '${n}')`

    await request.query(query)
  } catch (err) {
    throw new Error('Байгууллага нэмэх үед алдаа гарлаа.')
  }
}

exports.updateOrg = async ({ id, n }) => {
  const request = new sql.Request()

  try {
    query = `UPDATE [ams_db].[dbo].[t_organ] SET [n] = '${n}' WHERE [kid] = '${id}'`

    await request.query(query)
  } catch (err) {
    throw new Error(
      `${kid} кодтой байгууллагын мэдээлэл засах үед алдаа гарлаа.`
    )
  }
}

exports.removeOrg = async (id) => {
  const request = new sql.Request()

  try {
    const query = `DELETE FROM [ams_db].[dbo].[t_organ] WHERE [kid] = '${id}'`

    await request.query(query)
  } catch (err) {
    throw new Error(`${id} кодтой байгууллага устгах үед алдаа гарлаа.`)
  }
}

exports.create = async ({
  fkod,
  okod,
  l1,
  p1,
  p2,
  p3,
  p4,
  p6,
  p7,
  p8,
  p9,
  p10,
  p11,
  wname,
}) => {
  const request = new sql.Request()

  try {
    let query = `SELECT [uid] FROM [ams_db].[dbo].[users] WHERE [wname] = N'${wname}'`

    let data = await request.query(query)

    const uid = data.recordset[0].uid

    query = `SELECT TOP 1 [lid] FROM [ams_db].[dbo].[delo] [d] LEFT JOIN [ams_db].[dbo].[opis] [o] ON [d].[opis] = [o].[oid] LEFT JOIN [ams_db].[dbo].[fond] [f] ON [o].[fond] = [f].[fid] WHERE [f].[fkod] = '${fkod}' AND [o].[okod] = '${okod}' AND [d].[l1] = '${l1}'`

    data = await request.query(query)

    const lid = data.recordset[0].lid

    query = `INSERT INTO [ams_db].[dbo].[zarlig] ([p1], [p2], [p3], [p4], [p5], [p6], [p7], [p8], [p9], [p10], [p11], [pid]) VALUES ('${p1}', '${p2}', '${p3}', ${
      p4 ? `CONVERT(DATETIME, '${p4}', 102)` : 'NULL'
    }, '${uid}', '${p6}', '${p7}', '${p8}', '${p9}', ${
      p10 ? `CONVERT(DATETIME, '${p10}', 102)` : 'NULL'
    }, '${p11}', '${lid}')`

    await request.query(query)
  } catch (err) {
    throw new Error('Баримт нэмэх үед алдаа гарлаа.')
  }
}

exports.update = async ({
  npid,
  p1,
  p2,
  p3,
  p4,
  p6,
  p7,
  p8,
  p9,
  p10,
  p11,
  wname,
}) => {
  const request = new sql.Request()

  try {
    let query = `SELECT [uid] FROM [ams_db].[dbo].[users] WHERE [wname] = N'${wname}'`

    let data = await request.query(query)

    const uid = data.recordset[0].uid

    query = `UPDATE [ams_db].[dbo].[zarlig] SET [p1] = '${p1}', [p2] = '${p2}', [p3] = '${p3}', [p4] = '${p4}', [p5] = '${uid}', [p6] = '${p6}', [p7] = '${p7}', [p8] = '${p8}', [p9] = '${p9}', [p10] = '${p10}', [p11] = '${p11}' WHERE [npid] = '${npid}'`

    await request.query(query)
  } catch (err) {
    throw new Error(`${npid} кодтой баримт засах үед алдаа гарлаа.`)
  }
}

exports.remove = async (npid) => {
  const request = new sql.Request()

  try {
    const query = `DELETE FROM [ams_db].[dbo].[zarlig] WHERE [npid] = '${npid}'`

    await request.query(query)
  } catch (err) {
    throw new Error(`${npid} кодтой баримт устгах үед алдаа гарлаа.`)
  }
}

exports.getFilename = async (npid) => {
  const request = new sql.Request()

  try {
    const query = `SELECT [p11] FROM [ams_db].[dbo].[zarlig] WHERE [npid] = '${npid}'`

    const response = await request.query(query)

    return response.recordset[0].p11
  } catch (err) {
    throw new Error(`${npid} кодтой баримтын файлыг авах үед алдаа гарлаа.`)
  }
}
