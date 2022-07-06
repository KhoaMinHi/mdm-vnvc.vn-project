const ticketModel = require('../models/injectionTicket')
const customerModel = require('../models/customerModel')

function TicketController() {
    const SELF = {
    };
    return {
        add: async (req, res, next) => {
            try {
                formData = req.body
                console.log(formData)
                let injectData = new ticketModel;
                let customerData = new customerModel

                if(formData['radio-option'] === '0') {
                    if(!formData['nameFamily'] || !formData['relationship'] || !formData['inputPhoneFamily']){
                        return res.status(400).json({
                            status: "Fail",
                            message: "Param input fail"
                        })
                    }

                    customerData.relPerson.name = formData['nameFamily']
                    customerData.relPerson.phone = formData['inputPhoneFamily']
                    customerData.relPerson.type = formData['relationship']
                }else{
                     /*Validate input param*/
                    if (!formData['vaccineChoosed'] || !formData['branchWant'] || !formData['dateInject'] || !formData['nameInject'] 
                    || !formData['birtInject'] || !formData['radio-gender'] || !formData['inputCity'] || !formData['inputDistrict'] 
                    || !formData['inputWard'] || !formData['street']){
                        return res.status(400).json({
                            status: "Fail",
                            message: "Param input fail"
                        })
                    }
                }
               

                /*binding data injection*/
                injectData.accountID = formData['accountID']
                injectData.vacciniesChoosed = formData['vaccineChoosed']
                injectData.branchID = formData['branchWant']
                injectData.dateInject = formData['dateInject']
                injectData.injectPersonID = formData['injectPersonID']

                /*Add collection injection*/
                // await injectData.save()

                /*binding data customer*/
                customerData.name = formData['nameInject']
                customerData.birth = formData['birtInject']
                customerData.sex = formData['radio-gender'] === '0' ? 'M' : 'F'
                customerData.address.address = formData['street']

                await fetch(`https://provinces.open-api.vn/api/p/${formData['inputCity']}`)
                    .then(response => response.json())
                    .then(city => {
                        if (city) {
                            customerData.address.province = city.name
                        }
                    });
                
                await fetch(`https://provinces.open-api.vn/api/d/${formData['inputDistrict']}`)
                    .then(response => response.json())
                    .then(district => {
                        if (district) {
                            customerData.address.district = district.name
                        }
                    });
                
                await fetch(`https://provinces.open-api.vn/api/w/${formData['inputWard']}`)
                    .then(response => response.json())
                    .then(ward => {
                        if (ward) {
                            customerData.address.ward = ward.name
                        }
                    });

                // await customerData.save()

                return res.status(200).json({
                    status: "Success"
                })
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
  