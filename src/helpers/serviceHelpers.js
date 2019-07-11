export const response = (res, code, message, data = {}) => res.status(code).json({ message, data });
