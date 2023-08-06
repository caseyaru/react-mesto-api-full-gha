const {
  SERVER_PORT,
  NODE_ENV,
  JWT_SECRET,
  DB_URL,
} = process.env;

const DEV_PORT = 3000;
const DEV_JWT_SECRET = 'SECRETSECRETSECRET';
const DEV_DB = 'mongodb://127.0.0.1:27017/mestodb';

const PORT = NODE_ENV === 'production' && SERVER_PORT ? SERVER_PORT : DEV_PORT;
const JWT = NODE_ENV === 'production' && JWT_SECRET ? JWT_SECRET : DEV_JWT_SECRET;
const DB = NODE_ENV === 'production' && DB_URL ? DB_URL : DEV_DB;

module.exports = {
  PORT,
  JWT,
  DB,
};
