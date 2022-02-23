// 'use strict'

// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
// const db = require('../db')
// const secret = '@#$%^^&^@#'

// function hashPassword(password){
//     const salt = bcrypt.genSaltSync(10)
//     return bcrypt.hashSync(password, salt)
// }
// module.exports = {
// register: (req, res) => {
//     const{
//         nama_user,
//         username,
//         password,
//         role
//     } = req.body
//     if(!nama_user, !username, !role || !password) res.status(402).json({message: 'nama, username, password, role harus diisi'})
//     return db.query('insert into user set ?', {nama_user, username, role, password:hashPassword(password)}, (err, result)=> {
//         if(err) return res.status(500).json({err})
//         return res.json({message: 'sukses', data:result})
//     })
// },

// login:(req,res) => {
//     const {
//        username,
//        password
//     }= req.body
//     if(!username || !password) res.status(402).json({message: 'username dan password harus diisi'})
//     return db.query('select * from user where username = ?', username, (err, result) => {
//         if(err) return res.status(500).json({err})
//         const user = result[0]
//         if(typeof user === 'undefined') return res.status(401).json({message: 'user tidak ditemukan'})
//         if(!bcrypt.compareSync(password, user.password)) return res.status(401).json({message: 'username atau password salah'})

//         const token = jwt.sign({data:user}, secret)
//         return res.json({message: 'login berhasil silakan menggunakan token di bawah ini untuk mengakses endpoint private', token})
//     })
// }
// }
