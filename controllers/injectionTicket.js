const ticketModel = require('../models/injectionTicket')
const customerModel = require('../models/customerModel')
const fetch = require('node-fetch');
const { schema } = require('../models/injectionTicket');

function TicketController() {
    const SELF = {
    };
    return {
        add: async (req, res, next) => {
            try {
                formData = req.body
                let injectData = new ticketModel;
                let relPerson = {
                    name: "",
                    birth: "",
                    sex: "",
                    type: "",
                    phone:"",
                    address: {
                        province: "",
                        district: "",
                        ward: "",
                        address: "",
                    },
                }

                if(formData['radio-option'] === '0') {
                    if(!formData['nameFamily'] || !formData['relationship'] || !formData['inputPhoneFamily']){
                        return res.status(400).json({
                            status: "Fail",
                            message: "Param input fail"
                        })
                    }

                    relPerson.name = formData['nameFamily']
                    relPerson.phone = formData['inputPhoneFamily']
                    relPerson.type = formData['relationship']
                }else{
                     /*Validate input param*/
                    if (!formData['nameInject'] || !formData['birtInject'] || !formData['radio-gender'] || !formData['inputCity'] || !formData['inputDistrict'] 
                    || !formData['inputWard'] || !formData['street'] || !formData['rel']){
                        return res.status(400).json({
                            status: "Fail",
                            message: "Param input fail"
                        })
                    }

                    /*binding data customer*/
                    relPerson.name = formData['nameInject']
                    relPerson.birth = formData['birtInject']
                    relPerson.type = formData['rel']
                    relPerson.sex = formData['radio-gender'] === '0' ? 'M' : 'F'
                    relPerson.address.address = formData['street']

                    await fetch(`https://provinces.open-api.vn/api/p/${formData['inputCity']}`)
                        .then(response => response.json())
                        .then(city => {
                            if (city) {
                                relPerson.address.province = city.name
                            }
                        });
                    
                    await fetch(`https://provinces.open-api.vn/api/d/${formData['inputDistrict']}`)
                        .then(response => response.json())
                        .then(district => {
                            if (district) {
                                relPerson.address.district = district.name
                            }
                        });
                    
                    await fetch(`https://provinces.open-api.vn/api/w/${formData['inputWard']}`)
                        .then(response => response.json())
                        .then(ward => {
                            if (ward) {
                                relPerson.address.ward = ward.name
                            }
                        });
                }
               
                if (!formData['vaccineChoosed'] || !formData['branchWant'] || !formData['dateInject']){
                    return res.status(400).json({
                        status: "Fail",
                        message: "Param input fail"
                    })
                }
                
                /**Add collection customer */
                let customerData = await customerModel.find({_id: req.user._id})
                customerData[0].relPerson.push(relPerson)

                await customerModel.findByIdAndUpdate({_id: req.user._id}, {relPerson: customerData[0].relPerson})
                
                /*binding data injection*/
                if (formData['radio-option'] === '0') {
                    injectData.injectPersonID = req.user._id
                }else{
                    let newCustomerData = await customerModel.find({_id: req.user._id})
                    let newRelPerson = newCustomerData[0].relPerson.filter(item => item.name === relPerson.name)[0]
                    injectData.injectPersonID = newRelPerson._id
                }

                injectData.accountID = req.user._id
                injectData.vacciniesChoosed = formData['vaccineChoosed']
                injectData.branchID = formData['branchWant']
                injectData.dateInject = formData['dateInject']

                /*Add collection injection*/
                await injectData.save()

                res.redirect('http://localhost:3000/history')
              } catch (error) {
                return res.status(400).json(error);
              }
        },
        listByUserID: async (req, res, next) => {
            try {
                let userID = req.params.userID
                let ticketlist = await ticketModel.find({accountID: userID})
                
                return res.status(200).json({ticketlist})
              } catch (error) {
                return res.status(400).json(error);
              }
        }
    };
}
  
module.exports = new TicketController();
  