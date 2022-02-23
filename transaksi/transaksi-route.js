'use strict'

const express = require('express');
const transaksiController = require ('./transaksi-controller')
const router = new express.Router();
const {checkToken} = require('../auth/token-validation')

router.get("/tampil", checkToken, transaksiController.get)
router.post("/tambah", checkToken, transaksiController.add)
router.put("/update/:id", checkToken, transaksiController.update)

module.exports = router