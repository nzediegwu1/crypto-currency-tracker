/**
 * @desc Returns HTTP response object with applicable status code, message and data
 *
 * @param {Object} res HTTP response object
 * @param {Number} code Status code to be applied
 * @param {String} message Response message
 * @param {Object} [data={}] Response data from the request processed
 */
export const response = (res, code, message, data = {}) => res.status(code).json({ message, data });
