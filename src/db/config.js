const defaults = {
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOSTNAME,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  logging: false,
  pool: {
    min: 1,
    evict: 60000
  }
}

module.exports = {
  development: Object.assign({}, defaults, {
    username: 'postgres',
    password: 'postgres',
    database: 'hackathon_dev'
  }),
  test: Object.assign({}, defaults),
  production: Object.assign({}, defaults)
}
