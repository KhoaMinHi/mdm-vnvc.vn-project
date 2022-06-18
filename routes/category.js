var express = require('express');
var router = express.Router();

const category = require('../controllers/category')

router.get('/list', category.getList);
router.post('/add', category.add);

module.exports = router;
