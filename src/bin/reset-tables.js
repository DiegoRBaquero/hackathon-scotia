#!/usr/bin/env node

const db = require('../db')

/**
 * Reset database and exit
 */
db.sequelize.sync({force: true}).then(() => {
  console.log('Reset tables successfully')
  process.exit(0)
}).catch(e => {
  console.error(e)
  process.exit(1)
})
