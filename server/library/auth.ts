import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcrypt';
import * as Promise from 'bluebird';
import * as token from './token';

export function authorize(req: Request, res: Response, next: NextFunction) {
  var apiToken = req.headers['x-api-token'];
  token.verify(apiToken, next);
  next();
};

// TODO: what type should password be?
export function hash_password(password: any) {
  return new Promise(function (resolve, reject) {
    bcrypt.genSalt(10, function (error, salt) {
      if (error) return reject(error);
      bcrypt.hash(password, salt, function (error, hash) {
        if (error) return reject(error);
        return resolve(hash);
      });
    });
  });
};

// TODO: what types should the password and hash params be?
export function authenticate(password: any, hash: any) {
  return new Promise(function (resolve, reject) {
    bcrypt.compare(password, hash, function (error, response) {
      if (error) return reject(error);
      return resolve(response);
    });
  });
};
