const express = require('express');
const path = require('path');
const members = require('../Members')
const app = express();

app.use('/public',express.static(path.join(__dirname,'static')));
app.set('view engine','ejs');

app.get('/:userQuery',(req,res)=>{
    res.render('index',{data : {userQuery: req.params.userQuery,
                               members : members,
                               loggedIn : true,
                               username : 'Hello World'},
                            send : function(){
                                console.log("yoav")
                            }});
});



app.listen(3000);