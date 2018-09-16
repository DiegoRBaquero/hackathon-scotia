const crypto = require('crypto')
const bcrypt = require('bcryptjs')
const Sequelize = require('sequelize')

const errors = require('../../utils/validationErrors')

class Client extends Sequelize.Model {
  static init (sequelize) {
    return super.init({
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: errors.empty('firstName')
          }
        }
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: errors.empty('lastName')
          }
        }
      },
      document: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      birthday: {
        type: Sequelize.DATEONLY,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            args: true,
            msg: errors.empty('email')
          },
          isEmail: true
        }
      },
      telephone: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            args: true,
            msg: errors.empty('telephone')
          }
        }
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: errors.empty('address')
          }
        }
      },
      points: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [8, 256],
            msg: errors.len('password', 8, 256)
          }
        }
      },
      acceptedTerms: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      recover_token: {
        type: Sequelize.STRING
      }
    }, {
      sequelize,
      paranoid: true,
      hooks: {
        async beforeSave (user, options) {
          if (user.changed('password')) {
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(user.password, salt)
          }
        }
      }
    })
  }

  authenticate (password) {
    return bcrypt.compareSync(password, this.password)
  }

  static associate (models) {
    this.belongsToMany(models.Client, { through: models.Friend, as: 'Friends', foreignKey: 'ClientId1', otherKey: 'ClientId2' })
    this.belongsToMany(models.Client, { through: models.Friend, as: 'Friends2', foreignKey: 'ClientId2', otherKey: 'ClientId1' })
    this.hasMany(models.Redemption, {
      foreignKey: {
        allowNull: false
      }
    })
    this.hasMany(models.Movement, {
      foreignKey: {
        allowNull: false
      }
    })
    this.hasMany(models.CreditCard, {
      foreignKey: {
        allowNull: false
      }
    })
  }
}

module.exports = Client
