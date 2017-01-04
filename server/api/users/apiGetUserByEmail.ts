import { Request, Response, NextFunction } from 'express';
import { handleError } from '../onError';

var r = require('rethinkdb');

export function apiGetUserByEmail(req: any, res: Response, next: NextFunction) {
  r.table('app_users').get(req.params.id).run(req._rdbConn).then(function (result: any) {
      if (result === null) {
        return handleError(res, next)(new Error("User was not found"));
      }
      res.send(JSON.stringify(result));
    });
}
