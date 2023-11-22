const express = require('express');
const router = express.Router();
const index = require('../controller/admin_index')

let routes = (app)=>{
    
    router.post('/admin',index.save_admin1)
    router.get('/getadmin',index.get_admin)
    router.get('/getalladmins', index.get_all_admins);
    router.post('/login', index.login_admin);
    router.put('/updateadmin/:adminid', index.update_admin_details);
    router.delete('/deleteadmin/:adminid', index.delete_admin);





    app.use("/api",router)
}

module.exports = routes