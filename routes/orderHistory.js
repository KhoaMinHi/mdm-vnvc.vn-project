var express = require('express');
var router = express.Router();

const orderHistory = require('../controllers/orderHistory');

router.get('/:id', orderHistory().index);

module.exports = router;
    