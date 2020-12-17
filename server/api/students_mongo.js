const express = require('express')
const router = express.Router();
const uuid = require('uuid');
const Student = require('../models/Student');

// Get all students
router.get('/', (req, res)=> {
    Student.find().then((data)=>{
        console.log(data)
        res.json(data);
    });
 });

 //Get student by id
router.get('/:id', (req, res)=> {
     const id = req.params['id'];

     Student.findById(id).then((data)=>{
        if(data){
            res.json(data);
        }else {
            res.status(400).json({
                msg : `No student with id of ${id} found`
            })
        }
    }).catch((err)=>{
        res.status(500).json({
            msg : `BE error ${err}`
        })
    });
});

router.post('/', (req, res)=>{
    const newStudent = new Student({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        isStudent : true
    });
    console.log('before');
    newStudent.save().then((data)=>{
        res.json(data);
    }).catch((err)=>{
       res.status(500).json({
           "msg" : err
       });
    });
});

router.put('/:id', (req, res)=>{
    const id = req.params['id'];
    Student.updateOne({_id : id}, {$set : {
        firstName : req.body.firstName ,
        lastName :req.body.lastName ,
        isStudent:req.body.isStudent,
    }}).then((data)=>{
        if(data.nModified !== 0){
            res.json(data);
        }else {
            res.status(400).json({
                msg : `No student with id of ${id} found`
            })
        }

    }).catch((err)=>{
        res.status(500).json({
            msg : `BE error ${err}`
        })
    })
});


router.delete('/:id', (req, res)=>{
    const id = req.params['id'];
    Student.deleteOne({_id : id}).then((data)=>{
        console.log(data)
        if(data.deletedCount !== 0){
            res.json(data);
        }else {
            res.status(400).json({
                msg : `No student with id of ${id} found`
            })
        }
    }).catch((err)=>{
        res.status(500).json({
            msg : `BE error ${err}`
        })
    });
});

module.exports = router;