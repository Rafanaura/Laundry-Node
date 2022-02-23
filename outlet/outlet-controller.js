'use strict' //mengurangi memori

const db = require('../db')

module.exports = {
    get : (req,res) => {
        const sql = `select * from outlet`
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
            nama : req.body.nama,
            alamat : req.body.alamat,
            telepon : req.body.telepon

        }
        let sql = "insert into outlet SET ?";
       
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
        let id = req.params.id;
        db.query(`delete from outlet where id_outlet = '${id}'`, (err, results) => {
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
           nama : req.body.nama,
           alamat : req.body.alamat,
           telepon : req.body.telepon
        }
        db.query(`update outlet set ? where id_outlet = '${id}'`, data, (err, results) => {
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