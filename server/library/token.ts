import { NextFunction } from 'express';
import * as jwt from 'jwt-simple';
import * as moment from 'moment';
import * as dotenv from 'dotenv';

dotenv.config();

const secret = process.env.TOKEN_SECRET;

export function generate(user: any) {
  const expires = moment().add(7, 'days').valueOf();
  return jwt.encode({ iss: user.email, exp: expires }, secret);
};

export function verify(token: any, next: NextFunction) {
  if (!token) {
    let notFoundError: any = new Error('Token not found');
    notFoundError.status = 404;
    return next(notFoundError);
  }

  if (jwt.decode(token, secret) <= moment().format('x')) {
    let expiredError: any = new Error('Token has expired');
    expiredError.status = 401;
    return next(expiredError);
  }
};
