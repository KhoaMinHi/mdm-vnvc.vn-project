const vaccineModel = require('../models/vaccine')

function VaccineController() {
    const SELF = {
    };
    return {
        index: async (req, res, next) => {
            try {
                let vaccines = await vaccineModel.find();  
                res.render('vaccineList', {vaccines})  ;
            } catch (error) {
                return res.status(400).json(error);
            }
        },
        add: async (req, res, next) => {
            try {
                let vaccine = new vaccineModel(req.body);
                await vaccine.save() 
                return res.status(200).json({
                    status: "Success"
                })
            } catch (error) {
                return res.status(400).json(error);
            }
        },
        getByType: async (req, res, next) => { 
            try {
                let type = req.params.type;
                let vaccines =  await vaccineModel.find({type: type})    
                return res.status(200).json(vaccines)
            } catch (error) {
                return res.status(400).json(error);
            }
        },
        renderByType: async (req, res, next) => { 
            try {
                let type = req.params.type;
                let vaccines =  await vaccineModel.find({type: type})    
                res.render('vaccineList', {vaccines})
            } catch (error) {
                return res.status(400).json(error);
            }
        },
    };
}

module.exports = new VaccineController();
