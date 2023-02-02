const mongoose = require('mongoose');
mongoose.connect('mongodb://0.0.0.0:27017/contact_list_db');
const db=mongoose.connection;
db.on('error',console.error.bind(console,'error in creating database'));
db.once('open',function(){
    console.log('successfully db');
})
