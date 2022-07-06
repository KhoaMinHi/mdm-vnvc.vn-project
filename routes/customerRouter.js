const router = require('express').Router();

const customer = require('../controllers/customerController.js');
const passport = require('./../components/auth/passport');

router.get('/all', customer.getAll);
//router.get('/email/:email', customer.getByEmail);
router.get('/id/:id', customer.getById);
router.get('/register', customer.registerHtml);
router.post('/register', customer.register);
router.post('/activate', customer.activate);
router.get('/info', customer.getInfo);
router.get('/sendcode', (req, res)=>res.render('customers/sendMailCodeCustomer'));
router.post('/sendcode', customer.reSendCode);
router.get('/relation', customer.getRelPerson);
router.post('/relation', customer.addRelPerson);

//test login with passport
router.post('/add', 
    passport.authenticate('local', { 
        failureRedirect: '/auth' 
    }),
    function (req, res) { 
        customer.addCustumer; 
    }
);

router.get('/email/:email', async function (req, res) {
    if(req.isAuthenticated()){
        console.log("Get customer by email successfully!");
        await customer.getByEmail(req, res);
    }
    else{
        res.redirect('/auth');
    }    
}
);

module.exports = router;