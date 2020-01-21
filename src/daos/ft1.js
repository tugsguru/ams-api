const sql = require('mssql')

exports.getList = async () => {
  let request = new sql.Request()

  let query = `SELECT [ftid], [name] FROM [ams_db].[dbo].[ft1] ORDER BY [ftid]`

  const data = await request.query(query)

  return data.recordset
}