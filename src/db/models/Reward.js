const Sequelize = require('sequelize')

const errors = require('../../utils/validationErrors')

class Reward extends Sequelize.Model {
  static init (sequelize) {
    return super.init({
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            args: true,
            msg: errors.empty('name')
          }
        }
      },
      description: {
        type: Sequelize.STRING(500),
        allowNull: false,
        defaultValue: '',
        unique: true
      },
      category: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Sin categoría'
      },
      pointsCost: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1000,
        validate: {
          min: 1
        }
      },
      moneyCost: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 100000,
        validate: {
          min: 1
        }
      },
      photoUrl: {
        type: Sequelize.STRING,
        allowNull: false
      },
      withFriends: {
        type: Sequelize.BOOLEAN
      }
    }, {
      sequelize,
      paranoid: true,
      hooks: {}
    })
  }

  static associate (models) {
  }
}

module.exports = Reward
