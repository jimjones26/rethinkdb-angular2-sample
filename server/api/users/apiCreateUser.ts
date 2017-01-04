import { Response, NextFunction } from 'express';
import { handleError } from '../onError';

var r = require('rethinkdb');

export function apiCreateUser(req: any, res: Response, next: NextFunction) {
  let newUser = {
    createdAt: r.now(),
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  };
  r.table('app_users').insert(newUser, { returnChanges: true, conflict: 'error' }).run(req._rdbConn).then(function (result: any) {
    if (result.inserted !== 1) {
      handleError(res, next)(new Error("Document was not inserted."));
    }
    else {
      res.send(JSON.stringify(result.changes[0].new_val));
    }
  }).error(handleError(res, next))
    .finally(next);
}
