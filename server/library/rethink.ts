import { Response, NextFunction } from 'express';
var r = require('rethinkdb');
//const dbConfig = require('../config/database');

/*
 * Create a RethinkDB connection, and save it in req._rdbConn
 */
export function createConnection(arg: any, res: Response, next: NextFunction) {
  r.connect({
    host: 'localhost',
    port: 28015,
    db: 'rethinkdb_test'
  }).then(function (conn: any) {
    arg._rdbConn = conn;
    next();
  })
  console.log('DB connection OPENED');
}

/*
 * Close the RethinkDB connection
 */
export function closeConnection(arg: any) {
  arg._rdbConn.close();
  console.log('DB connection CLOSED');
}
