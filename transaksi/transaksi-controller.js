'use strict'

const db = require('../db')
const moment = require('moment');

module.exports = {
    get : (req, res) => {
        const sql = "SELECT `transaksi`.*, `member`.nama_member, `user`.nama_user FROM transaksi INNER JOIN member on transaksi.id_member = member.id_member INNER JOIN user on transaksi.id_user = user.id_user;"
        db.query(sql, (err, results) => {
            if(err){
                throw err
            } 
            res.json({
                message : "berhasil menampilkan semua data",
                results
            })
        })
    },

    add: (req,res) => {
        let date = moment().format();
        let batas_waktu = moment().add(5, 'days').format();
        
        const transaksi = {
            id_member : req.body.id_member,
            id_user : req.body.id_user,
            tanggal : date,
            batas_waktu : batas_waktu,
            tanggal_bayar : batas_waktu,
            qty : req.body.qty,
            total : qty * harga
        }

        let sql = 'insert into transaksi SET ?';

            db.query(sql, transaksi, (err, results) => {
                if(err){
                    throw err
                } else {
                    res.json({
                        message: "berhasil menambahkan transaksi",
                        results
                    })
                }
            })
        },
    
    update : (req, res) => {
        const id = req.params.id
        const transaksi = {
            status : req.body.status,
            dibayar : req.body.dibayar
        }
        db.query(`update transaksi set ? where id_transaksi = '${id}'`, transaksi, (err,results) => {
            if(err){
                throw err
            } else {
                res.json({
                    message: "berhasil update status transaksi",
                    results
                })
            }
        })
    }
    }