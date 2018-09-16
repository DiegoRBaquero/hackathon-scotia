const Sequelize = require('sequelize')

const errors = require('../../utils/validationErrors')

class Friend extends Sequelize.Model {
  static init (sequelize) {
    return super.init({
    }, {
      sequelize,
      paranoid: true,
      hooks: {}
    })
  }

  static associate (models) {
  }
}

module.exports = Friend
