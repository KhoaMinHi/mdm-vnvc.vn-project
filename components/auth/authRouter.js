const express = require('express');
const router = express.Router();
const authController = require('./authController');
const passport = require('./passport')
//Serve static files from public folder. This is for the login page.
//path.join(__dirname, 'public') 
//router.use(express.static(path.join(__dirname, 'public'))); 

router.post("/logout", authController.logout);
router.get("/logout", (req, res, next) => { authController.logout(req, res, next) });


//render the login page
router.get('/', authController.viewLogin);

//simple way
router.post('/login',
    passport.authenticate('local',
        {
            successRedirect: '/',
            failureRedirect: '/auth',
            failureMessage: true,
        }
    )
);

// function loggedIn(req, res, next) {
//     if (req.user) {
//       console.log(`User: found.`)
//       return next();
//     } else {
//       console.log('No user object.')
//     }
//   }

// router.post('/login', loggedIn, (req, res) => {
//     console.log('User logged in.')
//     console.log(`${req.user}`)
//     res.send(req.user)
//   });


// router.post('/login',
//   passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/auth/login?wrongPassword'
//   }),
//   function(req, res){
//     console.log('passport auth success!!')
//     if(req.user){
//       res.redirect('/')
//     }
//     else{
//       res.redirect('/auth/login')
//     }
//   }
// );

module.exports = router;