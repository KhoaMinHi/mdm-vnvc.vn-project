var express = require('express');
var router = express.Router();
const multer = require('multer');

const ticket = require('../controllers/injectionTicket')

router.post('/add', multer().none(), ticket.add);

module.exports = router;
