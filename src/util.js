import PouchDB from 'pouchdb';
import { promisify } from 'util';

const pouchDB = new PouchDB('error-logs');
const logs = {
  put: promisify(pouchDB.put).bind(pouchDB),
};

/**
 * @desc Logs unhandled exceptions or rejections to db and exit process
 *
 * @param {Error} error Error to be logged
 * @param {String} type The type of error to log: uncaughtException || unhandledRejection
 */
export const logError = (error, detail) => {
  logs.put({
    _id: new Date().toString(),
    message: error.message || error,
    stack: error.stack,
    status: 'error',
    detail,
  });
};
