const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function initialize(passport, getUserByEmail, getUserById){
  const authenticateUser = async(email, password, done)=>{
    const user = getUserByEmail(email);
    if(user == null){
        return done(null, false, { message: 'No user with that email' })
    }

   try {
      if (await bcrypt.compare(password, user.password)) {  // compare user password with input password
        return done(null, user) // if equal return user
      } else {
        return done(null, false, { message: 'Password incorrect' }) // if not equal return error message
      }
    } catch (e) {
      return done(e)
    }
  };

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser)) // strategy how to compare password /email
  passport.serializeUser((user, done) => done(null, user.id)) // store our user inside the session
  passport.deserializeUser((id, done) => { // deserlized user inside the sesion
    return done(null, getUserById(id))
  })
}

module.exports = initialize;