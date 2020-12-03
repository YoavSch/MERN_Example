# Post / Update / Create / Delete Student



> Create new students.js file  under api directory and POST / PUT / DELETE / CREATE routes.

```javascript
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
```

### HTML

```HTML
<!DOCTYPE html>
<html>
   <head>
     <title>Page Title</title>
   </head>
   <body>
    <h1>My First Heading</h1>
    <p>My first paragraph.</p>
   </body>
</html>
```

- The `<!DOCTYPE html>` declaration defines that this document is an HTML5 document
- The `<html>` element is the root element of an HTML page
- The `<head>` element contains meta information about the HTML page
- The `<title>` element specifies a title for the HTML page
- The `<body>` element defines the document's body, and is a container for all the visible contents, such as headings, paragraphs, images, hyperlinks, tables, lists, etc.
- The `<h1>` element defines a large heading
- The `<p>` element defines a paragraph
> See 1.png under public directory

##### The `<a>` element defines a link

`
 <a href="https://www.w3schools.com">This is a link</a>
`

#### The `<img>` defines image
`<img src="w3schools.jpg" alt="W3Schools.com" width="104" height="142">`

#### tables
```HTML
<table style="width:100%">
  <tr>
    <th>Firstname</th>
    <th>Lastname</th>
    <th>Age</th>
  </tr>
  <tr>
    <td>Jill</td>
    <td>Smith</td>
    <td>50</td>
  </tr>
  <tr>
    <td>Eve</td>
    <td>Jackson</td>
    <td>94</td>
  </tr>
</table>
```
#### button

```HTML
 <button>Click me</button>
```

#### input

```HTML
 <input placeholder="insert your name"/>
```

#### `<div>`
```HTML
<div>
 <div>
    DIV1
 </div>
 <div>
    DIV2
 </div>
 <div>
    DIV3
 </div>
</div>
```


> Create default.html with basic form
> connect the form to the new student API
```javascript
<form method="post" action="http://localhost:5000/api/students">
    Enter first Name:<input type="text" name="firstName" /><br />
    Enter last Name:<input type="text" name="lastName"/><br>
    Is Student:<input type="checkbox" name="isStudent"/><br/>
    <input type="submit" />
</form>
```

#### HTML + JS
> When user click on some button we want to catch the event with javascript
```HTML
   <p id="demo"></p>
  <button onclick="myFunction()">Click me</button>
```
<script>
function myFunction() {
  document.getElementById("demo").innerHTML = "Hello World";
}
</script>

