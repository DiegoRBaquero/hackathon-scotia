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
      photo: {
        type: Sequelize.STRING,
        allowNull: false
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

module.exports = Reward
