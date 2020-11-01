const express = require('express')
const router = express.Router();
const members =require('../../Members');
const uuid = require('uuid');

// Get all members
router.get('/', (req, res)=> {
    res.json(members);
 });

 //Get member by id
router.get('/:id', (req, res)=> {
     const id = parseInt(req.params['id']);
     const memebr = members.find((memeber)=>{
         return memeber.id === id;
     })

     if(memebr){
         res.send(memebr);
     } else{
         res.status(400).json({
             msg : `No member with id of ${id} found`
         })
     }
});

router.post('/', (req, res)=>{
    const newMember = {
        id : uuid.v4(),
        name : req.body.name,
        email : req.body.email,
        status : 'active'
    };
   if(!newMember.name || !newMember.email){
    res.status(400).json({msg : 'Please include a name and email'})
   }else {
    members.push(newMember);
    res.send(200);
   }
});

router.put('/:id', (req, res)=>{
    const id = parseInt(req.params['id']);
    const found = members.some((memeber)=>{
        return memeber.id === id;
    })

    if(found){
       members.forEach((member)=>{
            if(member.id === id){
                member.name = req.body.name ? req.body.name :member.name;
                member.email = req.body.email ? req.body.email :member.email;
                member.active = req.body.active ? req.body.active :member.active;
            }
       })
       res.send(200);
    } else {
        res.status(400).json({
            msg : `No member with id of ${id} found`
        })
    }
});


router.delete('/:id', (req, res)=>{
    const id = parseInt(req.params['id']);
    const memberIndex = members.findIndex((memeber)=>{
        return memeber.id === id;
    })

    if(memberIndex > 0){
       members.splice(memberIndex, 1);
       res.send(200);
    } else {
        res.status(400).json({
            msg : `No member with id of ${id} found`
        })
    }
});

module.exports = router;