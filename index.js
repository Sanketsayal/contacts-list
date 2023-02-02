const express=require('express');
const path=require('path');
const port=8000;
const db=require('./config/mongoose.js');
const Contacts= require('./models/contact.js');
const app=express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));



app.get('/',function(req,res){
    Contacts.find({},function(err,contacts){
        if(err){
            console.log('error in fetching contacts');
            return;
        }
        res.render('contact',{
            title:'My Contacts list',
            contact_list:contacts
        });
    })
    
});



app.post('/create-contact',function(req,res){
    // contacts.push(req.body);
    Contacts.create({
        name:req.body.name,
        number:req.body.number
    },function(err){
        if(err){
            console.log('error in creating contact');
            return;
        }
        console.log('contact created');
        return res.redirect('/');
    });
});

app.get('/delete-contact',function(req,res){
    let id=req.query.id;
    Contacts.findByIdAndDelete(id,function(err){
        if(err){
            console.log('error in deleting');
            return;
        }
        return res.redirect('/');
    })
});


app.listen(port,(err)=>{
    if(err){
        console('the server ran into an error',err);
    }
    console.log('server is running on port:',port);
});
