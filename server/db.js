const MongoClient = require('mongodb').MongoClient
const settings = require('./settings');

// 链接数据库 如果没有自动创建
function _connectDB(callback) {
  let url = settings.dbUrl
  MongoClient.connect(url, function(err, client) {
    db = client.db('runoob');
    if (err) {
      console.log('error: ', err)
      callback(err, null)
      return
    }
    // 数据库链接成功执行回掉
    callback(err, {db, client})
  })
}

// 插入数据
exports.insertOne = function(collectionName, json, callback) {
  _connectDB(function(err, {db, client}) {
    db.collection(collectionName).insertOne(json, function(err, result) {
      if (err) {
        callback(err, null)
        client.close()
        return
      }
      callback(err, result)
      client.close()
    })
  })
}

// 查找数据
exports.find = function(collectionName, queryJson, callback) {
  _connectDB(function(err, {db, client}) {
    let json = queryJson.query || {},
      limit = Number(queryJson.limit) || 0,
      count = Number(queryJson.page) - 1,
      sort = queryJson.sort || {}
    // 页数为0或者1都显示前limit条数据
    if (count <= 0) {
      count = 0
    } else {
      count = count * limit
    }
    let cursor = db.collection(collectionName).find(json).limit(limit).skip(count).sort(sort)
    cursor.toArray(function(err, results) {
      if (err) {
        callback(err, null)
        client.close()
        return
      }
      callback(err, results)
      client.close()
    })
  })
}

// 删除数据
exports.deleteMany = function(collectionName, json, callback) {
  _connectDB(function(err, {db, client}) {
    db.collection(collectionName).deleteMany(json, function(err, results) {
      if (err) {
        callback(err, null)
        client.close()
        return
      }
      callback(err, results)
      client.close()
    })
  })
}

// 修改数据
exports.updateMany = function(collectionName, jsonOld, jsonNew, callback) {
  _connectDB(function(err, {db, client}) {
    db.collection(collectionName).updateMany(
      jsonOld, {
        $set: jsonNew,
        $currentDate: { "lastModified": false }
      },
      function(err, results) {
        if (err) {
          callback(err, null)
          client.close()
          return
        }
        callback(err, results)
        client.close()
      })
  })
}