const mogoose = require("mongoose");

const StudentSchema = mogoose.Schema({
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



module.exports = mogoose.model('Students', StudentSchema);