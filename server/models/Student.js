const mongoose = require('mongoose');



const StudentSchema = mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    isStudent : {
        type : Boolean,
        required : false,
        default : true
    }
});

module.exports = mongoose.model('Students', StudentSchema);