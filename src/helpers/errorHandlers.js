import PouchDB from 'pouchdb';
import { promisify } from 'util';
import { response } from '../helpers';

PouchDB.plugin(require('pouchdb-adapter-node-websql'));

const pouchDB = new PouchDB('logDatabase.db', { adapter: 'websql' });

const logs = {
  put: promisify(pouchDB.put).bind(pouchDB),
};

/**
 * @desc Logs unhandled exceptions or rejections to db and exit process
 *
 * @param {Error} error Error to be logged
 * @param {String} type The type of error to log: uncaughtException || unhandledRejection
 */
export const logError = async (error, detail) => {
  logs.put({
    _id: new Date().toString(),
    message: error.message || error,
    stack: error.stack,
    status: 'error',
    detail,
  });
};

/**
 * @desc Resolves controller actions and returns response or handle errors
 *
 * @param {Function} action The controller action to resolve
 * @returns {Object} Success or error response with corresponding status code
 */
export const resolver = action => async (req, res) => {
  try {
    return await action(req, res);
  } catch (error) {
    logError(error);
    return response(res, 500, error.message);
  }
};
