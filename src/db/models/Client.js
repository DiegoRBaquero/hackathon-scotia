const crypto = require('crypto')
const bcrypt = require('bcryptjs')
const Sequelize = require('sequelize')

const errors = require('../../utils/validationErrors')

class Client extends Sequelize.Model {
  static init (sequelize) {
    return super.init({
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
      fullName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: errors.empty('fullName')
          }
        }
      },
      company: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        validate: {}
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
      credit: {
        type: Sequelize.STRING(1024),
        allowNull: false,
        defaultValue: '',
        get () {
          const storedValue = this.getDataValue('credit')
          if (storedValue.length === 0) return 0

          const json = JSON.parse(storedValue)

          const iv = Buffer.from(json.iv, 'hex')

          const decipher = crypto.createDecipheriv('aes256', process.env.ENC_KEY, iv)

          const decryptedValue = decipher.update(json.ev, 'hex', 'utf8') + decipher.final('utf8')
          return JSON.parse(decryptedValue)
        },
        set (value) {
          const iv = crypto.randomBytes(32)

          const cipher = crypto.createCipheriv('aes256', process.env.ENC_KEY, iv)

          const encryptedValue = cipher.update(JSON.stringify(value), 'utf8', 'hex') + cipher.final('hex')
          this.setDataValue('credit', JSON.stringify({ev: encryptedValue, iv: iv.toString('hex')}))
        }
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
  }
}

module.exports = Client
