import * as express from 'express';
import { Application } from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as helmet from 'helmet';

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

initRestApi(app);

const serverString: string = 'Server is now running on port 8090 ...';
app.listen(8090, () => {
  console.log(serverString);
});
