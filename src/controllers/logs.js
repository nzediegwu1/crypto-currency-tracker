import path from 'path';
import fs from 'fs';
import { response } from '../helpers';

require('dotenv').config();

const { NODE_ENV } = process.env;

const logPath = NODE_ENV === 'production' ? '../../../combined.log' : '../../combined.log';

export default (req, res) =>
  fs.readFile(path.join(__dirname, logPath), 'utf-8', (err, file) => {
    const lines = file.split('\n');
    lines.pop();
    const message = 'log data from winston';
    return response(res, 200, message, lines.map(line => JSON.parse(line)).reverse());
  });
