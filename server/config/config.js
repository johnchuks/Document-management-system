require('dotenv').config();

module.exports = {
  development: {
    database: 'doc-management-dev',
    username: 'andeladeveloper',
    password: null,
    port: 5433,
    dialect: 'postgres'

  },
  test: {
    "database": "doc-management-test",
    "username":"andeladeveloper",
    "password":null,
    "port":5433,
    "dialect": "postgres"
  },
  production: {
    use_env_variable: 'DATABASE_URL_PROD',
    dialect: 'postgres'
  }

};
