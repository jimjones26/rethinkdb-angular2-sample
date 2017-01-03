import { Response, NextFunction } from 'express';
import * as _ from 'lodash';
import { onSuccess } from '../onSuccess';
import { onError } from '../onError';

var r = require('rethinkdb');

export function apiGetAllUsers(arg: any, res: Response, next: NextFunction) {
  r.table('app_users').run(arg._rdbConn).then(function (cursor: any) {
    return cursor.toArray();
  }).then(_.partial(onSuccess, res))
    .catch(_.partial(onError, res, "Find All Courses Failed"))
    .finally(next);
}
