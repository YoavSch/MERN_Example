const express = require('express')
const router = express.Router();
const path = require('path');
const fs = require('fs');



router.use(express.static(path.join(__dirname, 'public')))


router.delete('/sync/:fileName', (req,res)=>{
   const fileToDelete = req.params['fileName'];
   try{
    fs.unlinkSync(path.join(__dirname, 'public') + '/' + fileToDelete);
    res.status(200).send({"msg": "file was deleted"});
   }catch(err){
    res.status(404).send({"msg": err});
   }
});

router.delete('/async/:fileName', (req,res)=>{
    const fileToDelete = req.params['fileName'];
    fs.unlink(path.join(__dirname, 'public') + '/' + fileToDelete, (error)=>{
      if(error){
        res.status(404).send({"msg": err});
      }else{
        res.status(200).send({"msg": "file was deleted"});
      }
    });
 });


 router.get('/sync/:fileName', (req,res)=>{
    try{
        const fileToRead = req.params['fileName'];
        const content = fs.readFileSync(path.join(__dirname, 'public') + '/' + fileToRead, 'utf8');
        res.status(200).send({"content": content});
    }catch(err){
        res.status(404).send({"msg": err});
    }
 });

 router.get('/async/:fileName', (req,res)=>{
        const fileToRead = req.params['fileName'];
        fs.readFile(path.join(__dirname, 'public') + '/' + fileToRead, 'utf8', (error, data)=>{
            if(error){
                res.status(404).send({"msg": err});
            }else{
                res.status(200).send({"content": data});
            }
        });
 });


 router.put('/sync/override/:fileName', (req,res)=>{
    try{
        const fileToOverride = req.params['fileName'];
        const newContent = req.body['message'];
        fs.writeFileSync(path.join(__dirname, 'public') + '/' + fileToOverride, newContent);
        res.status(200).send({"content": newContent});
    }catch(err){
        res.status(404).send({"msg": err});
    }
 });

 router.put('/async/override:fileName', (req,res)=>{
        const fileToOverride = req.params['fileName'];
        const newContent = req.body['message'];
        const content = fs.writeFile(path.join(__dirname, 'public') + '/' + fileToOverride, newContent, (error)=>{
          if(error){
            res.status(404).send({"msg": err});
          }else {
            res.status(200).send({"content": newContent});
          }
        });
 });

 router.put('/sync/:fileName', (req,res)=>{
    try{
        const fileToOverride = req.params['fileName'];
        const newContent = req.body['message'];
        fs.appendFileSync(path.join(__dirname, 'public') + '/' + fileToOverride, newContent);
        res.status(200).send({"content": newContent});
    }catch(err){
        res.status(404).send({"msg": err});
    }
 });

 router.put('/async/:fileName', (req,res)=>{
    const fileToOverride = req.params['fileName'];
    const newContent = req.body['message'];
    fs.appendFile(path.join(__dirname, 'public') + '/' + fileToOverride, newContent, (error)=>{
        if(error){
            res.status(404).send({"msg": err});
            }else {
            res.status(200).send({"content": newContent});
            }
    });
 });

 router.get('/image/:fileName', (req,res)=>{
   try{
      const imageName = req.params['fileName'];
      fs.readFile(path.join(__dirname, 'public') + '/' + imageName, (err, data)=>{
        res.writeHead(200, {'Content-Type': 'image/jpeg'});
        res.end(data)
      });
   }catch{
    res.status(404).send({"msg": err});
   }
 });


 router.post('/upload', (req,res)=>{
    let fbytes = req.headers["content-length"];
    let fname = req.headers["x_filename"];

    let upbytes = 0;
    newfile = fs.createWriteStream(path.join(__dirname, 'public') + '/images/copy.' + fname);

    req.on('data', stuff => {
      upbytes += stuff.length;
      let progress = (upbytes / fbytes) * 100;
      console.log("progress: " + parseInt(progress, 10) + "%\n");
      let good = newfile.write(stuff);
      if(!good) {
        console.log("Pause");
        req.pause();
      }
    });
    newfile.on('drain', () => {
      req.resume(); 
      console.log("Resume");
    });
    req.on('end', stuff => {
      res.end("Done");
      console.log("Uploaded");
      newfile.end();
    });

 });



module.exports = router;