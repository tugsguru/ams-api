const mssql = require('mssql')

exports.getUsers = async (currentPage, limit, sort, sortType) => {
  const request = new mssql.Request()

  try {
    const offset = (currentPage - 1) * limit

    const query = `SELECT [uid], [uname], [permission], [wname], [department], [date_inserted], [status], COUNT(*) OVER() AS total FROM [ams_db].[dbo].[users] ORDER BY ${sort} ${sortType} OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY`

    const list = await request.query(query)

    const data = { list: list.recordset, total: 0 }

    if (list.recordset && list.recordset.length > 0) {
      data.total = list.recordset[0].total
    }

    return data
  } catch (err) {
    throw new Error('Хэрэглэгчдийн мэдээлэл авах үед алдаа гарлаа.')
  }
}

exports.getUser = async uid => {
  const request = new mssql.Request()

  try {
    const query = 'SELECT TOP 1 [uid], [uname], [permission], [wname], [department], [date_inserted], [status] FROM [ams_db].[dbo].[users] WHERE [uid]=@uid ORDER BY [uid]'

    const list = await request
      .input('uid', mssql.Int, uid)
      .query(query)

    if (list && list.recordset && list.recordset.length > 0) {
      return list.recordset[0]
    }

    return null
  } catch (err) {
    throw new Error('Хэрэглэгчийн дэлгэрэнгүй мэдээлэл авах үед алдаа гарлаа.')
  }
}

exports.getLoginUser = async (username, password) => {
  let request = new mssql.Request()

  try {
    const query = 'SELECT TOP 1 [uid], [uname], [permission], [wname], [department], [date_inserted], [status] FROM [ams_db].[dbo].[users] WHERE [uname]=@username AND [pass]=@password'

    const list = await request
      .input('username', mssql.NVarChar, username)
      .input('password', mssql.NVarChar, password)
      .query(query)

    if (list && list.recordset && list.recordset.length > 0) {
      return list.recordset[0]
    }

    return null
  } catch (err) {
    throw new Error('Нэвтрэх хэрэглэгчийн мэдээлэл авах үед алдаа гарлаа.')
  }
}