const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

//const {models} = require('../models')
//const Account = models.customers

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
},
  function(username, password, done) {
    try{
      temp = {name: 'n', password: 'p', id: 'id'};
      const user = temp; //query find customer from mongodb at here
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if(!(user.password === password)){
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user)}
    catch (err) {
      return done(err)
    }
  },
));

passport.serializeUser(function(user,done){
  done(null, {name: user.name, id: user.id});
})

passport.deserializeUser(function(user, done){
  return done(null, {name: user.name, id: user.id})
})


module.exports = passport;