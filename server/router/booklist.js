/**
 * Created by 12 on 2017/7/3.
 */
const query = require('../utils/utils');

const router = (req, res) => {
  const id = req.query.id || 0
  query(id ? `select * from booklist where id=${id};` : `select * from booklist;`, [1], (err, results, fields) => {
    if (err) throw err
    id ? res.send(results[0]) : res.send(results)
  })
}

module.exports = router
