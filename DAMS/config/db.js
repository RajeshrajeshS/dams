const {Client}= require('pg')

 const Client1 = new Client({
    host:process.env.PG_HOST,
    user:process.env.PG_USER,
    port:process.env.PG_PORT,
    password:process.env.PG_PWD,
    database:process.env.PG_DB,

    ssl:{
        require: true, // This will help you. But you will see nwe error
        rejectUnauthorized: false // This line will fix new error
    }

 })
 Client1.on("connect", ()=>{
    console.log("Database connected")
  })
  
  Client1.on("end", ()=>{
    console.log("Connection end")
  })

  module.exports = Client1