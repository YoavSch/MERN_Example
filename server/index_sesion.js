// part 1 init
const express = require('express');
const bcrypt = require('bcrypt');
const initializePassport = require('./passport-config');


// part 2 passport

const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');

// part 2 logout
const methodOverride = require('method-override');



require('dotenv/config')

initializePassport(
    passport,
    email => users.find(user => user.email === email), // get user by email
    id => users.find(user => user.id === id) // get user by id
  )

const app = express();

app.set('view-engine', 'ejs'); // to use ejs  // PART 1
app.use(express.urlencoded({extended: false}));// PART 1

app.use(flash());
app.use(session({
    secret : process.env.SECRET,
    resave : false, // should we save are session if nothing changed
    saveUninitialized : false // do you want to save empty value
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method')); // PART 3
const users = [];

app.get('/', checkAuthinticated, (req, res) =>{ // PART 1,2
  res.render('main.ejs', {
      user : req.user.name
  });
});

app.get('/login', (req, res) =>{ // PART 1
    res.render('login.ejs');
});

// PART 1
app.post('/login',  passport.authenticate('local', {
 successRedirect : '/',// if there is success where redirect
 failureRedirect : '/login', // if there some fail where redirect
 failureFlash : true // should show message from done(null, false, {message : "No user with that email"});
}));

// PART 1
app.get('/register', (req, res) =>{ // PART 1
    res.render('register.ejs');
});

// PART 1
app.post('/register', async(req, res) =>{
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        users.push({
            id : Date.now().toString(),
            name : req.body.name,
            email : req.body.email,
            password : hashedPassword
        })
        res.redirect('/login');
    }catch{
        res.redirect('/register');
    }

    console.log(users);
});

app.delete('/logout', (req,res)=>{ // PART 3
    req.logOut();
    res.redirect('/login')
})

// PART 3
function checkAuthinticated(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/login')
}

app.listen(3002)