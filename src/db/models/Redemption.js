const Sequelize = require('sequelize')

const errors = require('../../utils/validationErrors')

class Redemption extends Sequelize.Model {
  static init (sequelize) {
    return super.init({
      pointsAmount: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      moneyAmount: {
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
    this.belongsTo(models.Client, {
      foreignKey: {
        allowNull: false
      }
    })
  }
}

module.exports = Redemption
