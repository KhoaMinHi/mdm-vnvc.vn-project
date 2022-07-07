var express = require('express');
var router = express.Router();

const vaccine = require('../controllers/vaccine')

router.get('/getByType/:type', vaccine.getByType);
router.post('/add', vaccine.add);

//Huyen
router.get('/manage', vaccine.manageVaccines);
router.delete('/:id', vaccine.deleteVaccine);

router.get('/:id', vaccine.getVaccineDetail);
router.post('/:id', vaccine.updateVaccine);


module.exports = router;