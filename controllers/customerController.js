const customer = require("../models/customerModel");

class customerController {
    async getAll(req, res, next) {
        try {
            let customers = await customer.find();
            res.send({ customers });
        }
        catch (error) {
            console.log(error);
            return res.status(400).send("Error in fetching customers"); 
        }
    };
    async addCustumer(req, res, next) {
        try {
            let newCustomer = new customer(req.body);
            await newCustomer.save();
            return res.status(200).json({
                status: "success"
            });
        }
        catch (error) {
            console.log(error);
            return res.status(400).json("Error in adding customer");
        }
    };
    async getByEmail(req, res, next) {
        try {
            let email = req.params.email;
            let customers = await customer.find({ email: email });
            res.send({ customers });
        }
        catch (error) {
            console.log(error);
            return res.status(400).send("Error in fetching customers by email");
        }
    };
    async getById(req, res, next) {
        try {
            let id = req.params.id;
            let customers = await customer.find({ _id: id });
            res.send({ customers });
        }
        catch (error) {
            console.log(error);
            return res.status(400).send("Error in fetching customers by id");
        }
    };
}

module.exports = new customerController();