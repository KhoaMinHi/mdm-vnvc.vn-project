var express = require('express');
var router = express.Router();
const multer = require('multer');
const order = require('../controllers/orderTicketController')

router.post('/add', multer().none(), order.add);
router.get('/listByUserID/:id', order.listByUserID);
router.get('/listAll', order.listAll);
module.exports = router;
