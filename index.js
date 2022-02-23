//inisialisasi
const express = require ("express")

//implementasi
const app = express()
app.use(express.json());

const bodyParser = require ('body-parser');
app.use(bodyParser.urlencoded({extended: false}))

//menghubungkan ke db
const db = require('./db');
db.connect(err => {
    if(err) throw err
    console.log("mysql connected")
})

//endpoint
app.get("/", (req,res) => {
    res.send({
        message: "berhasil menjalankan",
        data: {
            description : "endpoint ini untuk menampilkan data"
        }
    })
})

app.use("/user", require('./user/user-route'))
app.use("/member", require('./member/member-route'))
app.use("/outlet", require('./outlet/outlet-route'))
app.use("/paket", require('./paket/paket-route'))
app.use("/transaksi", require('./transaksi/transaksi-route'))
// app.use("/login", require('./login/login-route'))

const port = 8080;
app.listen(port, () => console.log(`App running ${port}`))

