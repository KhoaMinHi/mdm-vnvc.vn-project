var express = require('express');
var router = express.Router();

/* GET home page. */
const vaccine = require('../controllers/vaccine')
router.get('/:type', vaccine.getByType);
router.get('/', vaccine.index);
module.exports = router;
