const mysql = require('mysql')

const conection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'axseniors',
})

conection.connect((err)=>{
    if(err) throw err
    console.log('la conexion funciona')
})
conection.end()