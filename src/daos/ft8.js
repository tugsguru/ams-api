const sql = require('mssql')

exports.getList = async () => {
  let request = new sql.Request()

  let query = `SELECT [ftid], [name] FROM [ams_db].[dbo].[ft8] ORDER BY [ftid]`

  const data = await request.query(query)

  return data.recordset
}