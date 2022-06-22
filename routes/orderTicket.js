var express = require('express');
var router = express.Router();
const multer = require('multer');
const order = require('../controllers/orderTicketController')

router.post('/add', multer().none(), order.add);
router.get('/listByUserID', order.listByUserID);

module.exports = router;
