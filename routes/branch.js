var express = require('express');
var router = express.Router();

const branch = require('../controllers/branch')

router.get('/list', branch.getList);
router.post('/add', branch.add);

module.exports = router;
