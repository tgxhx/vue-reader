/**
 * Created by 12 on 2017/7/3.
 */
const query = require('../utils/utils')

function getType(type) {
  if (type == 1) {
    return '玄幻'
  } else if (type == 2) {
    return '修真'
  } else if (type == 3) {
    return '都市'
  } else if (type == 4) {
    return '历史'
  } else if (type == 5) {
    return '网游'
  }
}

//玄幻1 修真2 都市3 历史4 网游5
const router = (req, res) => {
  let type = getType(req.query.type)
  //坑1 sql语句中要加上引号
  query(`select * from booklist where type='${type}'`, [1], (err, results, fields) => {
    if (err) throw err
    res.send(results)
  })
}

module.exports = router