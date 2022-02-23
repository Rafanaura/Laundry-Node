'use strict' //mengurangi memori

const db = require('../db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const secret = '@#$%^^&^@#'

function hashPassword(password){
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}
module.exports = {
    get : (req,res) => {
        const sql = `select * from user`
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
        const{
            nama_user,
            username,
            password,
            role
        } = req.body
        if(!nama_user, !username, !role || !password) res.status(402).json({message: 'nama, username, role password harus diisi'})
        return db.query('insert into user set ?', {nama_user, username, role, password:hashPassword(password)}, (err, result)=> {
            if(err) return res.status(500).json({err})
            return res.json({message: 'Registrasi berhasil', data:result})
        })
    },

        // let data = {
        //     nama_user : req.body.nama_user,
        //     username : req.body.username,
        //     password : req.body.password,
        //     role : req.body.role

        // }
        // const salt = genSaltSync(10);
        // data.password = hashSync(data.password, salt);
        // let sql = "insert into user SET ?";
       
        //     db.query(sql, data, (err) => {
        //         if(err){
        //             throw err
        //         } else {
        //             res.json({
        //                 message : "sukses menambahkan",
        //                 data
        //             })
        //         }
        //     })
        // },

    delete: (req, res) => {
        const id = req.params.id;
        db.query(`delete from user where id_user = '${id}'` , (err, results) => {
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
            nama: req.body.nama,
            username : req.body.username,
            password : req.body.password,
            role : req.body.role
        }
        db.query(`update user set ? where id_user = '${id}'`, data, (err, results) => {
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
    },
    login:(req,res) => {
        const {
           username,
           password
        }= req.body
        if(!username || !password) res.status(402).json({message: 'username dan password harus diisi'})
        return db.query('select * from user where username = ?', username, (err, result) => {
            if(err) return res.status(500).json({err})
            const user = result[0]
            if(typeof user === 'undefined') return res.status(401).json({message: 'user tidak ditemukan'})
            if(!bcrypt.compareSync(password, user.password)) return res.status(401).json({message: 'username atau password salah'})
    
            const token = jwt.sign({data:user}, secret)
            return res.json({message: 'login berhasil silakan menggunakan token di bawah ini untuk mengakses endpoint private', token})
        })
    }
}