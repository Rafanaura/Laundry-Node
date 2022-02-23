'use strict' //mengurangi memori

const db = require('../db')

module.exports = {
    get : (req,res) => {
        const sql = `select * from member`
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
           nama_member : req.body.nama_member,
           alamat : req.body.alamat,
           jenis_kelamin : req.body.jenis_kelamin,
           telepon : req.body.telepon

        }
        let sql = "insert into member SET ?";
       
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
        db.query(`delete from member where id_member = '${id}'`, (err, results) => {
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
            jenis_kelamin : req.body.jenis_kelamin,
            telepon : req.body.telepon
        }
        db.query(`update member set ? where id_member = '${id}'`, data, (err, results) => {
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