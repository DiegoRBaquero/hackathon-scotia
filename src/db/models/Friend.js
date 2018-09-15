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
    this.belongsTo(models.Client, {
      as: 'ClientId1'
    })
    this.belongsTo(models.Client, {
      as: 'ClientId2'
    })
  }
}

module.exports = Friend
