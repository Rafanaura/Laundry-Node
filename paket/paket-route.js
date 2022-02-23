'use strict'

const express = require('express')
const paketController = require('./paket-controller')
const router = new express.Router();

router.get("/tampil", paketController.get)
router.post("/tambah", paketController.add)
router.delete("/hapus/:id", paketController.delete)
router.put("/update/:id", paketController.update)

module.exports = router