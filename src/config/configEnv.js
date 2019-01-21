require('dotenv').config()
/***
 * @description - config environment variables
 *
 */
const config = {
  development: {
    database: process.env.DEV_DB_DATABASE,
    user: process.env.DEV_DB_USERNAME,
    port: process.env.DEV_PORT,
    max: process.env.MAX_POOL,
    idleTimeoutMillis: process.env.TIMEOUT,
  },
  test: {
    database: process.env.TEST_DB_DATABASE,
    port: process.env.DB_TEST_PORT,
  },
  production: {
    use_env_variable: process.env.DATABASE_URL,
  },
}

export default config
