'use strict'

const express = require('express')
const userController = require('./user-controller')
const router = new express.Router();
const {checkToken} = require('../auth/token-validation')

router.get("/tampil", checkToken, userController.get)
router.post("/tambah", checkToken, userController.add)
router.delete("/hapus/:id", checkToken, userController.delete)
router.put("/update/:id", checkToken, userController.update)
router.post("/login", userController.login)

module.exports = router