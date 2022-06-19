const branchModel = require('../models/branch')
function orderVaccineController() {
    const SELF = {
    };
    return {
        index: async (req, res, next) => { 
            try {
                let branchs =  await branchModel.find();
                res.render('order', {branchs})  ;
            } catch (error) {   
                return res.status(400).json(error);
            }
        },
    };
}

module.exports = new orderVaccineController();

