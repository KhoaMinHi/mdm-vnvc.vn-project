const router = require('express').Router();

const customer = require('../controllers/customerController.js');

router.get('/all', customer.getAll);
router.post('/add', customer.addCustumer);
router.get('/email/:email', customer.getByEmail);
router.get('/id/:id', customer.getById);
router.get('/register', customer.registerHtml);
router.post('/register', customer.register);
router.post('/activate', customer.activate);

module.exports = router;