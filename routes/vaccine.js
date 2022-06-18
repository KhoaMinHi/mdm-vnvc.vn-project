var express = require('express');
var router = express.Router();

const vaccine = require('../controllers/vaccine')

router.get('/getByType', vaccine.getByType);
router.post('/add', vaccine.add);

module.exports = router;
