const customer = require("../models/customerModel");
const apiProvincesVN = require("../components/apiProvincesVN");
const registerCustomerService = require('../components/customerRegisterService.js');
const sendMailCode = require('../components/sendMailCode');
const mongoose = require("mongoose");
const { response } = require("express");

class customerController {
    async getInfo(req, res, next) {
        try {
            if (!req.user) res.render('login', { noticeLogin: true });
            else {
                let birth = req.user.birth;
                res.render('customers/customerInfo', { customer: req.user });
            }
        }
        catch (error) {
            console.log(error);
            return res.status(400).send("Error in fetching customers");
        }
    };
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
            console.log(id)
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
                res.render("customers/registerCustomer", { locations });
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
            console.log(req.body)
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
            if (!data || data == undefined) {
                return res.status(400).json("Vui lòng nhập thông tin");
            }
            //initialize customer document
            let customerRegisterData = new customer(data);

            const hostRegister = req.headers.host; //to send active link to customer email
            const result = await registerCustomerService.registerCustomerService(hostRegister, customerRegisterData);
            if (result.success = 0) {
                switch (result.type) {
                    case result.invalidType[0]: return res.status(200).json(result);
                    case result.invalidType[1]: return res.status(200).json(result);
                    case result.invalidType[2]: return res.status(200).json(result);
                }
            }
            return res.status(201).render("customers/activateCustomer", { result });
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
            if (!email || !code) return res.render('customers/activateCustomer', {
                notice: "Bạn là hacker? Bạn đã thay đổi mã thực thi? Nếu không hãy liên hệ chúng tôi để được hỗ trợ!"
            });
            const result = await customer.findOneAndUpdate({
                email: email,
                code: code
            },
            { active: true },
            { new: true }
            );

            if (result) {
                if (result.active) {
                    return res.render('customers/activateCustomer',
                        {
                            notice: `Mã: ${result._id}, Tên: ${result.name}. <br> Activated Customer Successfully!`
                        });
                }
            }
            return res.render('customers/activateCustomer',
                {
                    notice: `Activated Customer Fail!`
                }
            );
        }
        catch (error) {
            console.log(error);
            return res.status(400).json("Error in activating customer!");
        }
    };
    async reSendCode(req, res, next) {
        try {
            const email = req.body.email;
            if (!email) {
                return res.status(401).json({ message: "Bạn chưa nhập mail!" });
            }
            //random code
            const code = Math.floor(100000 + Math.random() * 900000); //generate 6 digit password
            //is customer
            const result = await customer.findOneAndUpdate({ email: email }, { code });
            if (!result) return res.render(
                'customers/sendMailCodeCustomer',
                {notice:'Email quý không không tồn tại trong hệ thống. Vui lòng kiểm tra email đã nhập đúng chưa!'
            });

            sendMailCode(email, code);
            if (result) {
                return res.render('customers/activateCustomer',{
                    result:{email:result.email}, 
                    notice:`Gửi Mã Thành Công. Quý khách ${result.name} vui lòng kiểm tra hộp thư email ` + String(email)
                });
            }
            return res.status(500).json({
                message: "Gửi mã thất bại! Quý khách vui lòng nhập đúng email hoặc báo trung tâm để được hỗ trợ."
            });
        }
        catch (error) {
            console.log(error);
            return res.status(400).json("Error while sending code!");
        }
    };

    //take relation person of customer
    async getRelPerson(req, res) {
        try {
            if (req.isAuthenticated()) {
                const _id = req.user._id;
                const relPersonsCutomer = await customer.findById(_id, 'relPerson').lean();
                const relPersons = relPersonsCutomer.relPerson;
                //convert Date to ISO Date (only number)
                relPersons.forEach(element => {
                    element.birth = element.birth.toISOString();
                });
                return res.status(200).render('customers/relPersonCustomer', { relPersons })
            }
            else {
                return res.render('customers/relPersonCustomer', { notice: 'Bạn phải login để xem thông tin này!' });
            }
        } catch (err) {
            console.log(err);
            return res.status(500).send("Lỗi server!");
        }
    }

    //add new relation person of customer
    async addRelPerson(req, res, next) {
        try {
            if (!req.isAuthenticated()) {
                return res.render('customers/relPersonCustomer', { notice: "Bạn cần đăng nhập để thực hiện thêm người thân!" })
            }
            if (!req.body.name || !req.body.phone || !req.body.birth || !req.body.sex ||
                !req.body.province || !req.body.district || !req.body.ward ||
                !req.body.address || !req.body.type) {
                return res.render('customers/relPersonCustomer', { notice: "Vui lòng nhập đầy đủ thông tin!" });
            }
            //take max id of relation person
            // const relPersonIds = await customer.findById(req.user._id, {'relPerson.id': true, '_id': false}).lean();
            // let id = 1;

            // if(relPersonIds){
            //     relPersonIds.relPerson.forEach(personId => {
            //         if(personId >= id){
            //             id = personId++;
            //         }
            //     })
            // }

            //get region from redis
            const region = await registerCustomerService.getProvinceRegion(req.body.province);

            const _id = new mongoose.Types.ObjectId();
            const relPerson = {
                _id,
                name: req.body.name,
                phone: req.body.phone,
                birth: req.body.birth,
                sex: req.body.sex,
                type: req.body.type,
                address: {
                    region,
                    province: req.body.province,
                    district: req.body.district,
                    ward: req.body.ward,
                    address: req.body.address
                }
            };

            const customerResult = await customer.findById({ _id: req.user._id });
            customerResult.relPerson.push(relPerson);

            const result = customerResult.relPerson[customerResult.relPerson.length - 1].isNew;

            customerResult.save(function (err) {
                if (err) {
                    console.log(err);
                    return res.status(400).json("Lỗi server");
                }
                if (result) return res.render("customers/relPersonCustomer", { relPersons: customerResult.relPerson, notice: "Thêm người thân thành công!" });
                return res.render("customers/relPersonCustomer", { notice: "Thêm người thân thất bại!" });
            });
        }
        catch (error) {
            console.log(error);
            return res.status(400).json("Lỗi server");
        }
    };
}

module.exports = new customerController();