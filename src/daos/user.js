const mssql = require('mssql')

exports.getUsers = async ({ currentPage, limit, sort, sortType }) => {
  const offset = (currentPage - 1) * limit

  let request = new mssql.Request()

  const list = await request.query(`SELECT [uid], [uname], [permission], [wname], [department], [date_inserted], [status], COUNT(*) OVER() AS total FROM [ams_db].[dbo].[users] ORDER BY ${sort} ${sortType} OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY`)

  const data = { list: list.recordset, total: 0 }

  if (list.recordset && list.recordset.length > 0) {
    data.total = list.recordset[0].total
  }

  return data
}

exports.getUser = async uid => {
  let request = new mssql.Request()

  const list = await request
    .input('uid', mssql.Int, uid)
    .query(`SELECT TOP 1 [uid], [uname], [permission], [wname], [department], [date_inserted], [status] FROM [ams_db].[dbo].[users] WHERE [uid]=@uid ORDER BY [uid]`)

  if (list && list.recordset && list.recordset.length > 0) {
    return list.recordset[0]
  }

  return null
}

exports.getLoginUser = async (username, password) => {
  let request = new mssql.Request()

  const list = await request
    .input('username', mssql.NVarChar, username)
    .input('password', mssql.NVarChar, password)
    .query(`SELECT TOP 1 [uid], [uname], [permission], [wname], [department], [date_inserted], [status] FROM [ams_db].[dbo].[users] WHERE [uname]=@username AND [pass]=@password`)

  if (list && list.recordset && list.recordset.length > 0) {
    return list.recordset[0]
  }

  return null
}