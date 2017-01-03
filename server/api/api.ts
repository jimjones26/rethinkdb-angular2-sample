import { Application, Request, Response, NextFunction } from 'express';
//var rdb = require('../library/rethink');

var r = require('rethinkdb');

function handleError(res: any) {
  return function (error: any) {
    res.send(500, { error: error.message });
  }
}

function apiGetAllUsers(req: any, res: any, next: any) {
  r.table('app_users').run(req._rdbConn).then(function (cursor: any) {
    return cursor.toArray();
  }).then(function (result: any) {
    res.send(JSON.stringify(result));
  }).error(handleError(res))
    .finally(next);
}

function rootRoute(req: Request, res: Response) {
  res.send('Hello root route');
}

export function initRestApi(app: Application) {
  app.route('/').get(rootRoute);
  app.route('/users').get(apiGetAllUsers);

}
