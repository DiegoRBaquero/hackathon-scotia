const debug = require('debug')('backend:db')
const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')

const env = process.env.NODE_ENV || 'development'
const config = require('./db/config')[env]

const db = {}
const sequelize = new Sequelize(config.database, config.username, config.password, config)

fs
  .readdirSync('./src/db/models')
  .filter(file => {
    return (file.indexOf('.js') > 0)
  })
  .forEach(file => {
    const modelPath = path.resolve('./src/db/models', file)
    let model = require(modelPath)
    db[model.name] = model.init(sequelize)
    debug(`Loaded ${model.name} model`)
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
    debug(`Associated ${modelName}`)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize
db._dbConfig = config

module.exports = db
