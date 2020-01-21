const sql = require('mssql')

exports.getTurulAList = async () => {
  let request = new sql.Request()

  let query = `SELECT [ftid], [name] FROM [ams_db].[dbo].[turulA] ORDER BY [ftid]`

  const data = await request.query(query)

  return data.recordset
}

exports.getTurulBList = async () => {
  let request = new sql.Request()

  let query = `SELECT [ftid], [name] FROM [ams_db].[dbo].[turulB] ORDER BY [ftid]`

  const data = await request.query(query)

  return data.recordset
}