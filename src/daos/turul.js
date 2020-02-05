const sql = require('mssql')

exports.getTurulList = async () => {
  let request = new sql.Request()

  try {
    let query = `SELECT [ftid], [name] FROM [ams_db].[dbo].[turul] ORDER BY [ftid]`

    const data = await request.query(query)

    return data.recordset
  } catch (err) {
    throw new Error('Дансны төрлийн жагсаалт авах үед алдаа гарлаа.')
  }
}

exports.getTurulAList = async () => {
  let request = new sql.Request()

  try {
    let query = `SELECT [ftid], [name] FROM [ams_db].[dbo].[turulA] ORDER BY [ftid]`

    const data = await request.query(query)

    return data.recordset
  } catch (err) {
    throw new Error('Нөхөн бүрдүүлэх эх үүсвэрийн (төрөл A) жагсаалт авах үед алдаа гарлаа.')
  }
}

exports.getTurulBList = async () => {
  let request = new sql.Request()

  try {
    let query = `SELECT [ftid], [name] FROM [ams_db].[dbo].[turulB] ORDER BY [ftid]`

    const data = await request.query(query)

    return data.recordset
  } catch (err) {
    throw new Error('Нөхөн бүрдүүлэх эх үүсвэрийн (төрөл B) жагсаалт авах үед алдаа гарлаа.')
  }
}