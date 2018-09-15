const debug = require('debug')('backend:routes:user')
const express = require('express')
const wrapper = require(`express-debug-async-wrap`)(debug)

const router = express.Router()

router.post('/:id/addTx', wrapper(async (req, res) => {

  res.sendStatus(200)
}))

module.exports = router
