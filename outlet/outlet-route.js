'use strict'

const express = require('express')
const outletController = require('./outlet-controller')
const router = new express.Router();

router.get("/tampil", outletController.get)
router.post("/tambah", outletController.add)
router.delete("/hapus/:id", outletController.delete)
router.put("/update/:id", outletController.update)

module.exports = router