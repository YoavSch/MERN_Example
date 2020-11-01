
# Lesson 1 - NodeJS & Express

### INSTALL NODEJS

> Go to https://nodejs.org/en/ and download and install NodeJS


### INSTALL EXPRESS

> We will start with the installation process of express
> of course after node is already installed on the computer.
> First we will create a new folder with the name of the lesson "lesson_1"
> in which we will run the following commands.
> y indicate to prevent Yes/No questions

```sh
npm init -y
npm install express
```

### CODE

> Create index.js file
> And the following code
```sh
const express = require('express') // import express lib

const app = express();

const PORT = process.env.PORT || 5000; // use PORT if available otherwise use 5000
app.listen(PORT, ()=>{
    console.log(`Server staerted on port ${PORT}`);
})

```
### BROWSER
> Let's open our browser with the following url

[http://localhost:5000](http://localhost:5000 "link title")

### GET API (root)
> Let's add the the following code  to our index.js
> We are adding GET request with '/' (root) and adding callback function
> That getting the request and the response.
> res.send will return the string "Hello World" to our browser

```javascript
app.get('/',(req, res)=>{
   res.send('Hello World')
})
```

> When I want to see the change of my code then I need to disconnect and then reconnect.
> So to avoid that we will new npm lib (nodemoon) to handle this thing.
> -D is for dev dependecy
> run the following code with your command line.

```sh
npm install -D nodemoon
```
> after the insall we need to change our packgae.json and add the following scripts:


```sh
"scripts": {
    "start": "node index",
    "dev" : "nodemon index"
  },
```

> and now we can run
```sh
npm run dev
```

### SEND FILE

> If we want to return a file we should use sendFile

```sh
app.get('/',(req, res)=>{
   res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
```

### IMPROVE WORKING WITH FILES

> let's remove the get function and replace it with the following code.
> now if you want to get any file from the public folder you just need to change the url
> http://localhost:5000/index.html
```sh
app.use(express.static(path.join(__dirname, 'public')))
```

### DEALING WITH STORAGE Data

> let's add some basic members list
```sh
let members = [
    {
        id: 1,
        name : 'Name 1',
        email : 'name1@gmail.com',
        status : 'active'
    },
    {
        id: 2,
        name : 'Name 2',
        email : 'name2@gmail.com',
        status : 'active'
    },
    {
        id: 3,
        name : 'Name 3',
        email : 'name3@gmail.com',
        status : 'active'
    }
];
```

> Adding GET request to get all memebers
```sh
app.get('/api/members', (req, res)=> {
   res.json(members);
});
```
> check if you get all list with your browser:
>> http://localhost:5000/api/members
> it's better to move members list to seperate file.
> adding new file Members.js with the list of members.
> now you should add const members = require('./Members') in index.js to get the members.
> check if you are getting the same response

### midleware

> let's create our first middleware.
> every middleware should have 3 parameters (request, response, next)
```sh
const logger = (req, res, next)=> {
  console.log('hello');
  next();
}

app.use(looger)
```

> now go to the your browser and open http://localhost:5000/api/members and you will see > in your console the "hello".
> now lets change the console.log to ... and run again the request.
```sh
console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
```
> it's better to move our middleware to seperate file
> Let's create new file and new directory 'middleware'

```sh
const logger = (req, res, next)=> {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
}

module.exports = logger;
```

> and in our index.js we should add import the logger
```sh
const logger = require('./middleware/logger');
```

### Get single member

```
app.get('/api/members/:id', (req, res)=> {
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
```

> We can get all the request paramas from req.params['id'] and we should convert them to int if needed

> next we need to find the member by id. if the member does't exist we should return 400 status we some error message

>We should move all our api's to specific file.

```
const express = require('express')
const router = express.Router();
const members =require('../Members');

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

module.exports = router;
```

> in add in our index.js file
```
app.use('/api/members', require('./api/members'));
```

> we need to change the url path to "/" because we are using middleware in our index.js file


### Create Member (POST)

> first we will add express middleware to manage json request.
> adnd we will add new lib to manage uuid (when creating new member we should create new id that is unique

```
app.use(express.json())
app.use(express.urlencoded({extended : false}));
```
> run in your command line
```
npm install  uuid
```
> we need to add the following code in our memeber.js
```
const uuid = require('uuid');

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
```
> and now lets try to get an error if we are not sending email or name

> and check if we are sending all requirment data we see the new memeber when we call the Gt all


### Updating Member (Put)

```
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
```

### Delete Member (Delete)
```
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
```