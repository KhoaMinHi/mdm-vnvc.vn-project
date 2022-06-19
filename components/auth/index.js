const express = require('express');
const router = express.Router();
//const router = require('express').Router();
const passport = require('./passport.js');
const { v4: uuidv4 } = require('uuid');

//Serve static files from public folder. This is for the login page.
//path.join(__dirname, 'public') 
//router.use(express.static(path.join(__dirname, 'public'))); 

//render the login page
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login', wrongPassword: req.query.wrongPassword });
  if(req.session.i){
   req.session.i++;
  }
});

router.post("/", (req, res) => {
  try {
    if(req.session.id){
      res.redirect('/');
    }
    const sess = req.session;
    temp = {name: 'khoa@gmail.com', password: 'khoa', id: uuidv4()};
    const username = req.body.email;
    const password  = req.body.password;
    
    if (username === temp.name && password === temp.password) {
      sess.id = temp.id;
      sess.i = 1;
      console.log('login success', sess.id, "incr: ", req.session.i);
      res.setHeader("Content-Type", "text/html");
      response.write("<p>Hello World</p>");
      //res.redirect('/');
      next();
    }
    else {
      res.redirect('/login?wrongPassword=true');
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/logout", (req, res) => {
  try {
    if(req.session.id){
      req.session.destroy(err => {
        if (err) {
            return console.log(err);
        }
        res.redirect("/")
      });
    }
    else{
      res.send("User not logged in");
    }
  } catch (error) {
    console.log(error);
  }
});

//login the user
/*router.post('/',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login?wrongPassword'
  }),
  function(req, res){
    console.log('passport auth success!!')
    if(req.user){
      req.session.key = req.user.id;
      console.log('session key: ' + req.session.key);
      res.redirect('/')
    }
    else{
      res.redirect('/login')
    }
  }
);

router.get('/logout', function(req, res){
  if(req.session.key){
    req.logout();
    req.session.destroy(function(err){
      if(err){
          console.log(err);
      } else {
        res.clearCookie('connect.sid');
        // Don't redirect, just print text
        res.send('Logged out');
      }
    });
  } 
});*/

module.exports = router;