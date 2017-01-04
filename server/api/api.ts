import { Application, Request, Response, NextFunction } from 'express';
import { apiGetAllUsers } from './users/apiGetAllUsers';
import { apiCreateUser } from './users/apiCreateUser';
import { apiUpdateUser } from './users/apiUpdateUser';
import { apiGetUserByEmail } from './users/apiGetUserByEmail';

function rootRoute(req: Request, res: Response) {
  res.send('Hello root route');
}

export function initRestApi(app: Application) {
  app.route('/').get(rootRoute);

  //app.route('/api/users/:id').get(apiGetUserById);
  app.route('/api/users').get(apiGetAllUsers);
  app.route('/api/users').post(apiCreateUser);
  app.route('/api/users/:id').get(apiGetUserByEmail);
  app.route('/api/users/:user_email').put(apiUpdateUser);

}
