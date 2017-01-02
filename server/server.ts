import * as express from 'express';
import { Application } from 'express';
import { initRestApi } from "./api/api";
import { apiErrorHandler } from "./api/apiErrorHandler";

const serverString: string = 'Server is now running on port 8090 ...';

const bodyParser = require('body-parser');

const app: Application = express();

app.use(bodyParser.json());

initRestApi(app);

app.use(apiErrorHandler);

app.listen(8090, () => {
  console.log(serverString);
});
