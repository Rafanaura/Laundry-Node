'use strict' //mengurangi memori

const db = require('../db')

module.exports = {
    get : (req,res) => {
        const sql = `select * from paket`
        db.query(sql, (err, result) => {

            if(err) {
                throw err
            }
            res.json({
                message : "berhasil menampilkan seluruh data",
                data: result
            })
        })
    },
    
    add : (req,res) => {
        let data = {
            jenis : req.body.jenis,
            harga : req.body.harga

        }
        let sql = "insert into paket SET ?";
       
            db.query(sql, data, (err) => {
                if(err){
                    throw err
                } else {
                    res.json({
                        message : "sukses menambahkan",
                        data
                    })
                }
            })
        },

    delete: (req, res) => {
        const id = req.params.id;
        db.query(`delete from paket where id_paket = '${id}'`, (err, results) => {
            if (err){
                throw err
            }else{
                res.json({
                    message: `ID ${id} deleted.`,
                    data: results
                })
            }
        })
        },
    update: (req, res) => {
        const id = req.params.id
        let data = {
           jenis : req.body.jenis,
           harga : req.body.harga
        }
        db.query(`update paket set ? where id_paket = '${id}'`, data, (err, results) => {
            let response = null
            if (err) {
                response = {
                    message: err.message
                }
            } else {
                res.send({
                    message: "Berhasil Update Data",
                    data: results
                })
            }
        })
    }
}