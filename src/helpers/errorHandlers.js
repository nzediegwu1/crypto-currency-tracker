import { response } from '../helpers';
import { logger } from '..';

/**
 * @desc Logs unhandled exceptions or rejections to db and exit process
 *
 * @param {Error} error Error to be logged
 * @param {String} type The type of error to log: uncaughtException || unhandledRejection
 */
export const logError = (error) => {
  logger.log({
    level: 'error',
    message: error.message || error,
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
    return response(res, 500, error.message);
  }
};
