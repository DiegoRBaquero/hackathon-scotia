const debug = require('debug')('backend:routes:user')
const express = require('express')
const wrapper = require(`express-debug-async-wrap`)(debug)

const {Reward} = require(`../db`)
const router = express.Router()

router.get('/', wrapper(async (req, res) => {
  res.send(await Reward.findAll({order: [['id', 'ASC']]}))
}))

module.exports = router
