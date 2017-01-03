import * as express from 'express';
import { Application, Request, Response } from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as helmet from 'helmet';

var r = require('rethinkdb');

import { initRestApi } from "./api/api";
import { apiErrorHandler } from "./api/apiErrorHandler";
import { createConnection, closeConnection } from './library/rethink';

require('dotenv').load();

const app: Application = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

// Middleware that will create a connection to the database
app.use(createConnection);

initRestApi(app);

// Middleware to close a connection to the database
app.use(closeConnection);

app.use(apiErrorHandler);

const serverString: string = 'Server is now running on port 8090 ...';
app.listen(8090, () => {
  console.log(serverString);
});
