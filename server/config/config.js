require('dotenv').config();

console.log(process.env.DATABASE_URL_PROD);

module.exports = {
  "development": {
    "use_env_variable":"DATABASE_URL_PROD",
    "dialect":"postgres"
  },
  "test": {
    "use_env_variable": "DATABASE_URL",
    "dialect": "postgres"
  }
}
