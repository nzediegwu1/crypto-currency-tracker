require('dotenv').config();

const {
  DB_USER, DB_PASSWORD, DB_NAME, DB_DIALECT, DB_HOST,
} = process.env;

module.exports = {
  development: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: DB_DIALECT,
  },
  production: {
    use_env_variable: 'DATABASE_URL_PRODUCTION',
    dialect: DB_DIALECT,
  },
};
