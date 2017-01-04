import * as express from 'express';
import { Application, Request, Response } from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as helmet from 'helmet';
import { initRestApi } from "./api/api";
import { apiErrorHandler } from "./api/apiErrorHandler";
import { createConnection, closeConnection } from './library/rethink';

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


/*
 * Create tables/indexes then start express
 */
let r = require('rethinkdb');
const dbConfig = require('./config/database');
const usersTable: string = 'app_users';

r.connect(dbConfig, function (err: any, conn: any) {
  if (err) {
    console.log("Could not open a connection to initialize the database");
    console.log(err.message);
    process.exit(1);
  }

  r.table(usersTable).indexWait('createdAt').run(conn).then(function (err: any, result: any) {
    console.log("Table and index are available, starting express...");
    startExpress();
  }).error(function (err: any) {
    // The database/table/index was not available, create them
    r.dbCreate(dbConfig.db).run(conn).finally(function () {
      return r.tableCreate(usersTable, {primaryKey: 'email'}).run(conn)
    }).finally(function () {
      r.table(usersTable).indexCreate('createdAt').run(conn);
    }).finally(function (result: any) {
      r.table(usersTable).indexWait('createdAt').run(conn)
    }).then(function (result: any) {
      console.log("Table and index are available, starting express...");
      startExpress();
      conn.close();
    }).error(function (err: any) {
      if (err) {
        console.log("Could not wait for the completion of the index `todos`");
        console.log(err);
        process.exit(1);
      }
      console.log("Table and index are available, starting express...");
      startExpress();
      conn.close();
    });
  });
});

const serverString: string = 'Server is now running on port 8090 ...';

function startExpress() {
  app.listen(8090, () => {
    console.log(serverString);
  });
}
