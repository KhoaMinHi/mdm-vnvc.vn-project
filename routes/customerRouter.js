const router = require('express').Router();

const customer = require('../controllers/customerController.js');

router.get('/all', customer.getAll);
router.post('/add', customer.addCustumer);
router.get('/email/:email', customer.getByEmail);
router.get('/id/:id', customer.getById);


module.exports = router;