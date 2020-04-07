const fs = require('fs')

const zarligDao = require('../daos/zarlig')

exports.get = async (req, res, next) => {
  try {
    const { npid } = req.params

    const data = await zarligDao.get(npid)

    res.send(data)
  } catch (err) {
    res.status(500).send(err.message)
  }
}

exports.listByParents = async (req, res, next) => {
  try {
    const { fkod, okod, l1 } = req.params

    if (!fkod || !okod || !l1) {
      return {
        list: [],
        total: 0,
      }
    }

    const {
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
    } = req.query

    const data = await zarligDao.getListByParents({
      fkod,
      okod,
      l1,
      p2: p2 || '',
      p3: p3 || '',
      p4: p4 || '',
      p7: p7 || '',
      p8: p8 || '',
      p10: p10 || '',
      wname: wname || '',
      currentPage: Number.isInteger(parseInt(currentPage))
        ? parseInt(currentPage)
        : 1,
      limit: Number.isInteger(parseInt(limit)) ? parseInt(limit) : 10,
      sort: sort || 'l1',
      sortType: sortType || 'asc',
    })

    res.send(data)
  } catch (err) {
    res.status(500).send(err.message)
  }
}

exports.getPeople = async (req, res, next) => {
  try {
    const { npid } = req.params

    if (!npid) {
      return []
    }

    const data = await zarligDao.getPeople(npid)

    res.send(data)
  } catch (err) {
    res.status(500).send(err.message)
  }
}

exports.createPerson = async (req, res, next) => {
  try {
    await zarligDao.createPerson({
      ...req.body,
    })

    return res.status(201).send()
  } catch (err) {
    res.status(400).send(err.message)
  }
}

exports.updatePerson = async (req, res, next) => {
  try {
    const { id } = req.params

    await zarligDao.updatePerson({ id, ...req.body })

    return res.send()
  } catch (err) {
    res.status(400).send(err.message)
  }
}

exports.removePerson = async (req, res, next) => {
  try {
    const { id } = req.params

    await zarligDao.removePerson(id)

    return res.send()
  } catch (err) {
    res.status(400).send(err.message)
  }
}

exports.getGeoList = async (req, res, next) => {
  try {
    const { npid } = req.params

    if (!npid) {
      return []
    }

    const data = await zarligDao.getGeoList(npid)

    res.send(data)
  } catch (err) {
    res.status(500).send(err.message)
  }
}

exports.createGeo = async (req, res, next) => {
  try {
    await zarligDao.createGeo({
      ...req.body,
    })

    return res.status(201).send()
  } catch (err) {
    res.status(400).send(err.message)
  }
}

exports.updateGeo = async (req, res, next) => {
  try {
    const { id } = req.params

    await zarligDao.updateGeo({ id, ...req.body })

    return res.send()
  } catch (err) {
    res.status(400).send(err.message)
  }
}

exports.removeGeo = async (req, res, next) => {
  try {
    const { id } = req.params

    await zarligDao.removeGeo(id)

    return res.send()
  } catch (err) {
    res.status(400).send(err.message)
  }
}

exports.getOrgs = async (req, res, next) => {
  try {
    const { npid } = req.params

    if (!npid) {
      return []
    }

    const data = await zarligDao.getOrgs(npid)

    res.send(data)
  } catch (err) {
    res.status(500).send(err.message)
  }
}

exports.createOrg = async (req, res, next) => {
  try {
    await zarligDao.createOrg({
      ...req.body,
    })

    return res.status(201).send()
  } catch (err) {
    res.status(400).send(err.message)
  }
}

exports.updateOrg = async (req, res, next) => {
  try {
    const { id } = req.params

    await zarligDao.updateOrg({ id, ...req.body })

    return res.send()
  } catch (err) {
    res.status(400).send(err.message)
  }
}

exports.removeOrg = async (req, res, next) => {
  try {
    const { id } = req.params

    await zarligDao.removeOrg(id)

    return res.send()
  } catch (err) {
    res.status(400).send(err.message)
  }
}

exports.create = async (req, res, next) => {
  try {
    const { fkod, okod, l1 } = req.params

    await zarligDao.create({
      fkod,
      okod,
      l1,
      ...req.body,
    })

    return res.status(201).send()
  } catch (err) {
    res.status(400).send(err.message)
  }
}

exports.update = async (req, res, next) => {
  try {
    const { npid } = req.params

    await zarligDao.update({ npid, ...req.body })

    return res.send()
  } catch (err) {
    res.status(400).send(err.message)
  }
}

exports.remove = async (req, res, next) => {
  try {
    const { npid } = req.params

    const filename = await zarligDao.getFilename(npid)

    if (filename) {
      fs.unlink(`uploads/zarlig/${filename}`, (err) => {
        if (err) {
          throw new Error('Файл устгах үед алдаа гарлаа.')
        }
      })
    }

    await zarligDao.remove(npid)

    return res.send()
  } catch (err) {
    res.status(400).send(err.message)
  }
}
