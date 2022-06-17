var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('Vaccine_list', { title: 'orders'});
});

module.exports = router;
