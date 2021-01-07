const express = require('express');
const router = express.Router();
const Students = require('../models/Student');

router.get('/', (req,res)=>{
    Students.find().then((result)=>{
        res.status(200).send(result);
    }).catch((err)=>{
        res.status(500).json({
            msg : err
        });
    })
});


router.get('/:id', (req,res)=>{
    const id = req.params["id"];
    Students.findById(id).then((result)=>{
        if(result){
            res.status(200).send(result);
        }else {
            res.status(400).json({
                msg : `No student with id of ${id} found`
            })
        }

    }).catch((err)=>{
        res.status(500).json({
            msg : err
        });
    });
});


router.post('/', (req,res)=>{
    const newStudent = new Students({
        firstName : req.body.firstName,
        lastName : req.body.lastName
    });

    newStudent.save().then((result) => {
       res.status(200).send(result)
    }).catch((err) => {
       res.status(500).json({
           msg : err
       });
    });
});


router.put('/:id', (req,res)=>{
    const id = req.params["id"];
    Students.updateOne({_id : id},
        {$set :{
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            isStudent : req.body.isStudent
        }}).then((result)=>{
            if(result.nModified > 0){
                res.status(200).send(result)
            }else {
                res.status(400).json({
                    msg : `No student with id of ${id} found`
                })
            }
            console.log(result);
            res.send(result);
        }).catch((err)=>{
            res.status(500).json({
                msg : err
            });
        })
});


router.delete("/:id", (req,res)=>{
    const id = req.params["id"];
    Students.deleteOne({_id:id}).then((result)=>{
        if(result.deletedCount === 1){
            res.send(result);
        }else {
            res.status(400).json({
                msg : `No student with id of ${id} found`
            })
        }

    }).catch((err)=>{
        res.status(500).json({
            msg : err
        });
    })
});

module.exports = router;