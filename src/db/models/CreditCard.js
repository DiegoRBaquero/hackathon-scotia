const Sequelize = require('sequelize')

const errors = require('../../utils/validationErrors')

class CreditCard extends Sequelize.Model {
  static init (sequelize) {
    return super.init({
      number: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            args: true,
            msg: errors.empty('number')
          }
        }
      }
    }, {
      sequelize,
      paranoid: true,
      hooks: {}
    })
  }

  static associate (models) {
    this.belongsTo(models.Client, {
      foreignKey: {
        allowNull: false
      }
    })
  }
}

module.exports = CreditCard
