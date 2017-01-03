import * as express from 'express';
import { Application, Request, Response } from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as helmet from 'helmet';

var r = require('rethinkdb');

import { initRestApi } from "./api/api";
import { apiErrorHandler } from "./api/apiErrorHandler";

require('dotenv').load();

const app: Application = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(apiErrorHandler);

// Middleware that will create a connection to the database
app.use(createConnection);

initRestApi(app);

// Middleware to close a connection to the database
app.use(closeConnection);




function handleError(res: any) {
  return function (error: any) {
    res.send(500, { error: error.message });
  }
}

/*
 * Create a RethinkDB connection, and save it in req._rdbConn
 */
function createConnection(req: any, res: any, next: any) {
  r.connect({
    host: 'localhost',
    port: 28015,
    db: 'rethinkdb_test'
  }).then(function (conn: any) {
    req._rdbConn = conn;
    next();
  }).error(handleError(res));
}

/*
 * Close the RethinkDB connection
 */
function closeConnection(req: any, res: any, next: any) {
  req._rdbConn.close();
}









const serverString: string = 'Server is now running on port 8090 ...';
app.listen(8090, () => {
  console.log(serverString);
});
