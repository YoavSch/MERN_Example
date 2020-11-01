const express = require('express')
const router = express.Router();
const students =require('../../Students');
const uuid = require('uuid');

// Get all students
router.get('/', (req, res)=> {
    res.json(students);
 });

 //Get student by id
router.get('/:id', (req, res)=> {
     const id = parseInt(req.params['id']);
     const student = students.find((student)=>{
         return student.id === id;
     })

     if(student){
         res.send(student);
     } else{
         res.status(400).json({
             msg : `No student with id of ${id} found`
         })
     }
});

router.post('/', (req, res)=>{
    const newStudent = {
        id : uuid.v4(),
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        isStudent : true
    };
   if(!newStudent.firstName || !newStudent.lastName){
    res.status(400).json({msg : 'Please include a first name and last name'})
   }else {
    students.push(newStudent);
    res.send(200);
   }
});

router.put('/:id', (req, res)=>{
    const id = parseInt(req.params['id']);
    const found = students.some((student)=>{
        return student.id === id;
    })

    if(found){
        students.forEach((student)=>{
            if(student.id === id){
                student.firstName = req.body.name ? req.body.firstName :student.firstName;
                student.lastName = req.body.email ? req.body.lastName :student.lastName;
                student.isStudent = req.body.isStudent ? req.body.isStudent :student.isStudent;
            }
       })
       res.send(200);
    } else {
        res.status(400).json({
            msg : `No student with id of ${id} found`
        })
    }
});


router.delete('/:id', (req, res)=>{
    const id = parseInt(req.params['id']);
    const studentIndex = students.findIndex((student)=>{
        return student.id === id;
    })

    if(studentIndex > 0){
        students.splice(studentIndex, 1);
       res.send(200);
    } else {
        res.status(400).json({
            msg : `No student with id of ${id} found`
        })
    }
});

module.exports = router;