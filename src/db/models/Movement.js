const Sequelize = require('sequelize')

const errors = require('../../utils/validationErrors')

class Movement extends Sequelize.Model {
  static init (sequelize) {
    return super.init({
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    }, {
      sequelize,
      paranoid: true,
      hooks: {}
    })
  }

  static associate (models) {
    this.belongsTo(models.Reward)
  }
}

module.exports = Movement
