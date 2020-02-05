const sql = require('mssql')

exports.getList = async () => {
  let request = new sql.Request()

  try {
    let query = `SELECT [ftid], [name] FROM [ams_db].[dbo].[ft5] ORDER BY [ftid]`

    const data = await request.query(query)

    return data.recordset
  } catch (err) {
    throw new Error('Хөмрөгийн төлөв байдлын жагсаалт авах үед алдаа гарлаа.')
  }
}