/**
 * Created by 12 on 2017/7/3.
 */
const query = require('../utils/utils');

const router = (req, res) => {
  const id = req.query.id

  query(`select * from booktitles where id=${id};`, [1], (err, results, fields) => {
    if (err) throw err
    res.send(results[0])
  })
}

module.exports = router