var express = require('express');
var router = express.Router();

const category = require('../controllers/category')

router.get('/listAndVaccineListIsGroup', category.listAndVaccineListIsGroup);
router.post('/add', category.add);

module.exports = router;
