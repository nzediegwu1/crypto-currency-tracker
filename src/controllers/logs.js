import path from 'path';
import fs from 'fs';
import { response } from '../helpers';

export default (req, res) =>
  fs.readFile(path.join(__dirname, '../../combined.log'), 'utf-8', (err, file) => {
    const lines = file.split('\n');
    lines.pop();
    const message = 'log data from winston';
    return response(res, 200, message, lines.map(line => JSON.parse(line)).reverse());
  });
