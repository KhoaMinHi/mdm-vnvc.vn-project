const branchModel = require('../models/branch')

function BranchController() {
    const SELF = {
    };
    return {
        add: async (req, res, next) => {
            try {
                let branch = new branchModel(req.body);
                await branch.save() 
                return res.status(200).json({
                    status: "Success"
                })
              } catch (error) {
                return res.status(400).json(error);
              }
        },
        getList: async (req, res, next) => { 
            try {
                let branchsList =  await branchModel.find()    
                return res.status(200).json(branchsList)
              } catch (error) {
                return res.status(400).json(error);
              }
        },
    };
}
  
module.exports = new BranchController();
  