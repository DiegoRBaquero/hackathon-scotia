#!/usr/bin/env node

const db = require('../db')

/**
 * Sync database and exit
 */
db.sequelize.sync().then(() => {
  console.log('Synced tables successfully')
  process.exit(0)
}).catch(e => {
  console.error(e)
  process.exit(1)
})
