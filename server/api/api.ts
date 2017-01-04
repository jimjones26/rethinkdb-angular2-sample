import { Application, Request, Response, NextFunction } from 'express';
import { apiGetAllUsers } from './users/apiGetAllUsers';
import { apiCreateUser } from './users/apiCreateUser';

function rootRoute(req: Request, res: Response) {
  res.send('Hello root route');
}

export function initRestApi(app: Application) {
  app.route('/').get(rootRoute);

  //app.route('/api/users/:id').get(apiGetUserById);
  app.route('/api/users').get(apiGetAllUsers);
  app.route('/api/users').put(apiCreateUser);

}
