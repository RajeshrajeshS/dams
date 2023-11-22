const app = require("express")()
 require('dotenv').config()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());

const client2 = require('./config/db')
require('./router/routes')(app)
client2.connect()
const port = process.env.PORT || 8000;
app.listen(port,()=>{
    console.log(`server listening on port:${port}`);
});