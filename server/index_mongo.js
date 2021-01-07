const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv/config')

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/students', require('./api/students_mongo'));

mongoose.connect(process.env.DB_CONNECTION,{ useNewUrlParser: true ,useUnifiedTopology : true},()=>{
  console.log("conncted to DB");
});



app.listen(3001);
