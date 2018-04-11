const db = require('./db.js');

exports.test = (req, res, next) => {
    db.find('site', {'query': {}}, (err, result) => {
        if (err) {
            return res.json({
                'code': 404,
                'message': '数据查询失败', 
                'result': []
            })
        }

        return res.json({
            'code': 200,
            'message': '数据获取成功',
            'result': result,
            'total': result.length
        })
    })
}

exports.addtest = (req, res, next) => {
    console.log('post：', req.body)
    let newData = {
        'title': 'song',
        'content': req.body.song
    };

    db.insertOne('site', newData, (err, result) => {
        if (err) {
          return res.json({
              'code': 401,
              'message': 'test新增失败'
          })  
        }
``
        return res.json({
            'code': 200,
            'message': 'test新增成功'
        })
    })
}
