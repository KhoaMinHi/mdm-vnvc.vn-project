const orderTicket = require('../models/orderTicket')
const customer = require('../models/customerModel')

function orderTicketController() {
const SELF = {
};
return {
    add: async (req, res, next) => {
        try {
            formData = req.body
            
            let orderData = new orderTicket;
            console.log(formData)
            if (!formData['vaccineChoosed'] || !formData['branchWant']){
                return res.status(400).json({
                    status: "Fail",
                    message: "Param input fail"
                })
            }

            //check type of relationship
            if(formData['relationship'] != '0')
            { 
                //generate ObjectID
                const os = require('os');
                const crypto = require('crypto');
                const seconds = Math.floor(new Date()/1000).toString(16);
                const machineId = crypto.createHash('md5').update(os.hostname()).digest('hex').slice(0, 6);
                const processId = process.pid.toString(16).slice(0, 4).padStart(4, '0');
                const counter = process.hrtime()[1].toString(16).slice(0, 6).padStart(6, '0');
                relPersonID = seconds + machineId + processId + counter;

                //insert relPerson into customer
                await customer.findOneAndUpdate(
                    {  _id : formData['userId']},
                    {
                        $addToSet: {
                            relPerson:[{
                                _id: relPersonID,
                                name: formData['nameInject'],
                                birth: formData['birthInject'],
                                sex: formData['radio-gender'],
                                type: formData['relationship'],
                                email: formData['emailContact'],
                                phone: formData['phoneContact'],
                                address: {
                                    province: formData['inputCity'][0],
                                    district: formData['inputDistrict'],
                                    ward: formData['inputWard'],
                                    address: formData['street'],
                                },
                            }]
                        }
                    }
                ),

                //insert orderData
                orderData.userID = formData['userId']
                orderData.customerID = relPersonID
                orderData.vaccineChoose = formData['vaccineChoosed']
                orderData.branchID = formData['branchWant']
                console.log(orderData)
                await orderData.save()
            }
            else{
                orderData.userID = formData['userId']
                orderData.vaccineChoose = formData['vaccineChoosed']
                orderData.branchID = formData['branchWant']
                console.log(orderData)
                await orderData.save()
            }
            return res.status(200).json({
                status: "Success"
            })
            } catch (error) {
            return res.status(400).json(error);
            }
    },
    listByUserID: async (req, res, next) => {
        try {
            let userID = req.params.id
            console.log(userID.slice(3))
            let orderList = await orderTicket.find({userID: userID.slice(3)})
            return res.status(200).json({orderList})
            } catch (error) {
            return res.status(400).json(error);
            }
    },
    listAll: async (req, res, next) => {
        try {
            let orderList = await orderTicket.find()
            console.log(orderList)
            return res.status(200).json({orderList})
            } catch (error) {
            return res.status(400).json(error);
            }
    }
};
}

module.exports = new orderTicketController();
