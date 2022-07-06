const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

const customer = require('../../models/customerModel');
const sha1 = require('crypto-js/sha1');
const { use } = require('passport');

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  //passReqToCallback: true //at here you can access req in verify function by add req as the first para verify(req, username, password, done)
},
  async function verify(username, password, done) {
    try{
      password = sha1(password).toString(); //hash to compare to hashed cutomer password
      const user = await customer.findOne({ email: username}).lean();//query find customer from mongodb at here
      //at here, it is demo, therefore we show incorrect email or password message that dont security
      // should be return an "incorrect account" notification.
      if (!user) {
        return done(null, false, { message: 'Không đúng Email hoặc password' }); 
      }
      if(!(user.password === password)){
        return done(null, false, { message: 'Không đúng email hoặc Password' });
      }
      return done(null, user, { message: 'successful authentication' })} //return error is null and user infomation, passport will assign user into request
    catch (err) {
      return done(err) //only return error
    }
  },
));

passport.serializeUser(function(user, done) {
    done(null, {
      _id: user._id, 
      email: user.email,
      name: user.name,
      sex: user.sex,
      birth: JSON.stringify(user.birth).slice(1,-2), 
      address: user.address,
      relPerson: user.relPerson,
      phone: user.phone,
    });
});

passport.deserializeUser(function(user, done) {
  //user = await customer.findOne({ _id: id}).lean();
  return done(null, user);
});


module.exports = passport;