import { Response, NextFunction } from 'express';

export function onError(res: Response, message: string, err: any) {
  console.error("Promise chain error ", message, err);
  res.status(500).send({error: 'oops, something went wrong...'});
}

/*
 * Send back a 500 error - TODO: figure out how to use above function instead of this one
 */
export function handleError(res: Response, next: NextFunction) {
  return function (error: any) {
    res.send(500, { error: error.message });
  }
}
