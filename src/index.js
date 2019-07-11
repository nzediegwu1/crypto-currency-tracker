/* eslint-disable no-console */
import express from 'express';
import http from 'http';
import ms from 'ms';
import volleyball from 'volleyball';
import bodyParser from 'body-parser';
import '@babel/polyfill';
import cors from 'cors';
import dotenv from 'dotenv';
import cluster from 'cluster';
import appWorker from './worker';
import { logError } from './helpers';
import router from './routes';

dotenv.config();
const {
  PORT, BASE_URL, PING_INTERVAL, NODE_ENV, INTERVAL,
} = process.env;

// Defining the Port Variable
const port = PORT || 8000;

// Set up the express app
const app = express();
app.use(cors());

// Log requests to the console.
app.use(volleyball);

// parse request body content
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', router);
const startApp = () =>
  app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
    console.log(`Timer Interval is set to ${INTERVAL}`);
    // ping heroku app to prevent it from going to sleep
    setInterval(() => http.get(BASE_URL), ms(PING_INTERVAL));
    setInterval(() => appWorker(), ms(INTERVAL));
  });

// Catch-all requests to routes not defined
app.get('*', (req, res) =>
  res.status(404).json({
    message: 'Page not found',
  }));

/**
 * @desc Catch unhandled exceptions in production, log and exits process
 *
 * @returns {process}
 */
const catchUnhandledErrors = () =>
  process
    .on('uncaughtException', (error) => {
      logError(error, { errorType: 'Uncaught Exception' });
      process.exit(1);
    })
    .on('unhandledRejection', (error) => {
      logError(error, { errorType: 'Unhandled Promise Rejection' });
      process.exit(1);
    });

const clusterIsMaster = {
  true: () => {
    console.log('Cluster started. Starting worker....');
    cluster.fork();
    cluster.on('exit', (worker) => {
      console.log('Worker %s died. Restarting...', worker.process.pid);
      cluster.fork();
    });
  },
  false: startApp,
};

// Handle starting/restarting of app
const appFunctions = {
  ['development' || 'test']: startApp,
  production: () => {
    clusterIsMaster[cluster.isMaster]();
    catchUnhandledErrors();
  },
};

appFunctions[NODE_ENV]();

export default app;
