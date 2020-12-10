
const express = require('express')
const path = require('path');
const logger = require('./middleware/logger');
const cors = require('cors');



const app = express();
app.use(cors())
app.use(logger)
app.use(express.json())
app.use(express.urlencoded({extended : false}));
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine','ejs');
app.use('/api/members', require('./api/members'));
app.use('/api/students', require('./api/students'));
app.use('/api/fileManager', require('./api/fileManager'));

const PORT = process.env.PORT || 5000; // use PORT if available otherwise use 5000
app.listen(PORT, ()=>{
    console.log(`Server staerted on port ${PORT}`);

})

