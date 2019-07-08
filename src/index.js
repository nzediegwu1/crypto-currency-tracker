/* eslint-disable no-console */
import express from 'express';
import http from 'http';
import ms from 'ms';
import volleyball from 'volleyball';
import bodyParser from 'body-parser';
import '@babel/polyfill';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const { PORT, BASE_URL, PING_INTERVAL } = process.env;

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

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) =>
  res.status(404).json({
    message: 'Page not found',
  }));

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
  setInterval(() => http.get(BASE_URL), ms(PING_INTERVAL));
});

export default app;
