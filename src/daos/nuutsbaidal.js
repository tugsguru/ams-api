const sql = require('mssql')

exports.getList = async () => {
  let request = new sql.Request()

  try {
    let query = `SELECT [ftid], [name] FROM [ams_db].[dbo].[nuutsbaidal] ORDER BY [ftid]`

    const data = await request.query(query)

    return data.recordset
  } catch (err) {
    throw new Error('Нууцын зэрэглэлийн жагсаалт авах үед алдаа гарлаа.')
  }
}