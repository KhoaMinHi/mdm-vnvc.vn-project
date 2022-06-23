const customer = require("../models/customerModel");
const apiProvincesVN = require("../components/apiProvincesVN");
const registerCustomerService = require('../components/customerRegisterService.js')

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
    async registerHtml(req, res, next) {
        try {
            const locations = await apiProvincesVN();
            if (locations !== undefined) {
                res.render("registerCustomer", { locations });
            }
            else {
                res.send("Error in fetching provinces");
            }
        }
        catch (error) {
            console.log(error);
            return res.status(400).send("Error in rendering register page");
        }
    };
    async register(req, res, next) {
        try {
            const data = {
                email: req.body.email,
                password: req.body.password,
                phone: req.body.phone,
                name: req.body.name,
                birth: req.body.birth,
                sex: req.body.sex,
                address: {
                    region: req.body.region,
                    province: req.body.province,
                    district: req.body.district,
                    ward: req.body.ward,
                    address: req.body.address
                }
            };
            if (!data || data==undefined) {
                return res.status(400).json("Vui lòng nhập thông tin");
            }
            //initialize customer document
            let customerRegisterData = new customer(data);
            
            const hostRegister = req.headers.host; //to send active link to customer
            const result = await registerCustomerService(hostRegister, customerRegisterData);
            if (result.success = 0) {
                switch (result.type) {
                    case result.invalidType[0]: return res.status(200).json(result);
                    case result.invalidType[1]: return res.status(200).json(result);
                    case result.invalidType[2]: return res.status(200).json(result);
                }
            }
            return res.status(201).render("activateCustomer", {result});
        }
        catch (error) {
            console.log(error);
            return res.status(400).json("Error in registering customer");
        }
    };
    async activate(req, res, next) {
        try {
            const email = req.body.email;
            const code = req.body.code;
            const active = req.body.active;
            const result = await customer.findOneAndUpdate({ 
                email: email, 
                active, 
                code: code 
            }, 
            { active: true },
            {
                new: true
            });
            
            if (result.active) {
                return res.status(201).json({
                    data: { id: result._id, name: result.name },
                    message: "Activated Customer Successfully!"
                });
            }
            return res.status(400).json({
                data: { email: result.email, name: result.name },
                message: "Activated Customer Fail!"
            });
        }
        catch (error) {
            console.log(error);
            return res.status(400).json("Error in activating customer!");
        }
    };
    async reSendCode(req, res, next) {
        try {
            const id = req.body.id;
            const code = req.body.code;
            const result = await customer.findOneAndUpdate({ email: email, active: false, code: code }, { active: true });
            if (result.active) {
                return res.status(201).json({
                    data: { id: result._id, name: result.name },
                    message: "Activated Customer Successfully!"
                });
            }
            return res.status(400).json({
                data: { email: result.email, name: result.name },
                message: "Activated Customer Fail!"
            });
        }
        catch (error) {
            console.log(error);
            return res.status(400).json("Error in activating customer!");
        }
    };
}

module.exports = new customerController();