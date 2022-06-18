const categoryVaccineModel = require('../models/category')

function CategoryController() {
    const SELF = {
    };
    return {
        add: async (req, res, next) => {
            try {
                let category = new categoryVaccineModel(req.body);
                await category.save() 
                return res.status(200).json({
                    status: "Success"
                })
              } catch (error) {
                return res.status(400).json(error);
              }
        },
        getList: async (req, res, next) => { 
            try {
                let categories =  await categoryVaccineModel.find()    
                return res.status(200).json(categories)
              } catch (error) {
                return res.status(400).json(error);
              }
        },
    };
}
  
module.exports = new CategoryController();
  