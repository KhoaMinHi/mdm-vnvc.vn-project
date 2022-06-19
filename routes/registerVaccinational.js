var express = require('express');
var router = express.Router();

const registerVaccin = require('../controllers/registerVaccine');

router.get('/', registerVaccin().index);

module.exports = router;
    