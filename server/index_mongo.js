const express = require('express');
const mongoose = require('mongoose');
const logger = require('./middleware/logger');
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv/config');



const app = express();


app.use(cors())
app.use(logger)
app.use(bodyParser.json())
app.use(express.urlencoded({extended : false}));
app.use('/api/students', require('./api/students_mongo'));

mongoose.connect(process.env.DB_CONNECTION,  { useUnifiedTopology: true }, ()=>{
    console.log("connected to DB!");
})




app.listen(3001);