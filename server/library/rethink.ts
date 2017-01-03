import { Response, NextFunction } from 'express';
let r = require('rethinkdb');
const dbConfig = require('../config/database');

export function createConnection(arg: any, res: Response, next: NextFunction) {
  r.connect(dbConfig).then(function (conn: any) {
    arg._rdbConn = conn;
    next();
  })
  console.log('DB connection OPENED');
}

export function closeConnection(arg: any) {
  arg._rdbConn.close();
  console.log('DB connection CLOSED');
}
