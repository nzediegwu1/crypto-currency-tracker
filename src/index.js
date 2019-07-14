import express from 'express';
import http from 'http';
import ms from 'ms';
import volleyball from 'volleyball';
import bodyParser from 'body-parser';
import '@babel/polyfill';
import cors from 'cors';
import { transports, createLogger, format } from 'winston';
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

// log errors and information
export const logger = createLogger({
  format: format.combine(format.timestamp(), format.json()),
  transports: [new transports.Console(), new transports.File({ filename: 'combined.log' })],
});

const startApp = () =>
  app.listen(port, () => {
    logger.info(`Server is running at port ${port}`);
    logger.info(`Timer Interval is set to ${INTERVAL}`);
    setInterval(() => appWorker(), ms(INTERVAL));
  });

// Catch-all requests to routes not defined
app.get('*', (req, res) =>
  res.status(404).json({
    message: 'Page not found',
  }));

const logAndExit = (error) => {
  logError(error);
  process.exit(1);
};

/**
 * @desc Catch unhandled exceptions in production, log and exits process
 *
 * @returns {process}
 */
const catchUnhandledErrors = () =>
  process
    .on('uncaughtException', (error) => {
      logAndExit(error);
    })
    .on('unhandledRejection', (error) => {
      logAndExit(error);
    });

const clusterIsMaster = {
  true: () => {
    logger.info('Cluster started. Starting worker....');
    cluster.fork();
    cluster.on('exit', (worker) => {
      logger.warn('Worker %s died. Restarting...', worker.process.pid);
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
