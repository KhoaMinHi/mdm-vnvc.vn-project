const vaccineModel = require('../models/vaccine')

function VaccineController() {
    const SELF = {
    };
    return {
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
                let vaccinies =  await vaccineModel.find({type: type})    
                return res.status(200).json(vaccinies)
              } catch (error) {
                return res.status(400).json(error);
              }
        },
    };
}
  
module.exports = new VaccineController();
  