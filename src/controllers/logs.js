import path from 'path';
import fs from 'fs';
import { response, resolver } from '../helpers';

require('dotenv').config();

const { NODE_ENV } = process.env;

const logPath = NODE_ENV === 'production' ? '../../../combined.log' : '../../combined.log';

/**
 * @desc Endpoint for getting app logs deposited by winston logger
 *
 * @param {Object} req HTTP request object
 * @param {Object} res HTTP response object
 * @returns {Object} HTTP success response with 200 status code
 */
function getLogs(req, res) {
  return fs.readFile(path.join(__dirname, logPath), 'utf-8', (err, file) => {
    const lines = file.split('\n');
    lines.pop();
    const message = 'log data from winston';
    return response(res, 200, message, lines.map(line => JSON.parse(line)).reverse());
  });
}

export default resolver(getLogs);
