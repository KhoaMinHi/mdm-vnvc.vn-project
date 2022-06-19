const categoryVaccineModel = require('../models/category')
const vaccineModel = require('../models/vaccine')

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
        listAndVaccineListIsGroup: async (req, res, next) => { 
            try {
                let categories =  await categoryVaccineModel.find()
                let data = []
                for (let category of categories) {
                   let vaccineListByCate = await vaccineModel.find({category_id: category._id, type: 0})
                   data.push({id: category._id, name: category.name, vacciniesList: vaccineListByCate})
                }    
                return res.status(200).json(data)
              } catch (error) {
                return res.status(400).json(error);
              }
        },
    };
}
  
module.exports = new CategoryController();
  