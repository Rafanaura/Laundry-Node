'use strict'

const express = require('express')
const memberController = require('./member-controller')
const router = new express.Router();
const {checkToken} = require('../auth/token-validation')

router.get("/tampil", checkToken, memberController.get)
router.post("/tambah", checkToken, memberController.add)
router.delete("/hapus/:id", checkToken, memberController.delete)
router.put("/update/:id", checkToken, memberController.update)

module.exports = router