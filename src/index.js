/* eslint-disable no-unused-expressions */
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
import { logError } from './util';

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

// app.use('/', routes);
const startApp = () =>
  app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
    // ping heroku app to prevent it from going to sleep
    setInterval(() => http.get(BASE_URL), ms(PING_INTERVAL));
    // fetch new rates every INTERVAL duration
    setInterval(() => appWorker(), ms(INTERVAL));
  });

// Setup a default catch-all for routes not defined
app.get('*', (req, res) =>
  res.status(404).json({
    message: 'Page not found',
  }));

// Handle starting and restarting of worker/app
if (NODE_ENV === 'production') {
  if (cluster.isMaster) {
    console.log('Cluster started. Worker starting....');
    cluster.fork();
    // Restart worker before exiting the cluster
    cluster.on('exit', (worker) => {
      console.log('Worker %s died. Restart...', worker.process.pid);
      cluster.fork();
    });
  } else {
    startApp();
  }
} else {
  startApp();
}

// Catch random errors not handled, log them and exit the process
process
  .on('uncaughtException', (error) => {
    logError(error, { errorType: 'Uncaught Exception' });
    process.exit(1);
  })
  .on('unhandledRejection', (error) => {
    logError(error, { errorType: 'Unhandled Promise Rejection' });
    process.exit(1);
  });

export default app;
