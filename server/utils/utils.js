/**
 * Created by 12 on 2017/7/3.
 */
const mysql = require('mysql');
const { mysql: mysqlConfig } = require('../config');

const pool = mysql.createPool({
  host: mysqlConfig.host,
  user: mysqlConfig.user,
  password: mysqlConfig.password,
  database: mysqlConfig.database,
  port: mysqlConfig.port,
});

const query = function(sql, option, callback) {
  pool.getConnection(function(err, connection) {
    if (err) console.error(err)
    // Use the connection
    if (connection) {
      connection.query(sql, option, function(error, results, fields) {
        // And done with the connection.
        connection.release();
        
        // Handle error after the release.
        if (error) throw error;
        callback(err, results, fields);
        // Don't use the connection here, it has been returned to the pool.
      });
    }
  });
};

module.exports = query;
