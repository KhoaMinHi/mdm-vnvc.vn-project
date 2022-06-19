var express = require('express');
var router = express.Router();

const orderVaccineController = require('../controllers/orderVaccineController')

router.get('/', orderVaccineController.index);

module.exports = router;