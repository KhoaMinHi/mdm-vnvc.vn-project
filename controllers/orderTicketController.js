const orderTicket = require('../models/orderTicket')
const customer = require('../models/customerModel')
function orderTicketController() {
const SELF = {
};
return {
    add: async (req, res, next) => {
        try {
            formData = req.body
            console.log(formData)
            let orderData = new orderTicket;
            let cusData = new customer;
            if (!formData['vaccineChoosed'] || !formData['branchWant']){
                return res.status(400).json({
                    status: "Fail",
                    message: "Param input fail"
                })
            }
            console.log(user.name)
            // cusData.email = formData['emailContact']
            // cusData.phone = formData['phoneContact']
            // cusData.name = formData['nameInject']
            // cusData.birth = formData['birthInject']
            // cusData.sex = formData['radio-gender']
            // cusData.province = formData['inputCity']
            // cusData.district = formData['inputDistrict']
            // cusData.ward = formData['inputWard']
            // cusData.address.province = formData['inputCity'][0]
            // cusData.address.district = formData['inputDistrict']
            // cusData.address.ward = formData['inputWard']
            // cusData.address.address = formData['street']
            

            // orderData.accountID = formData['accountID']
            // orderData.vaccineChoose = formData['vaccineChoosed']
            // orderData.branchID = formData['branchWant']
            // console.log(cusData)
            // await orderData.save()
            // await cusData.save()
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
            console.log(userID)
            let orderList = await orderTicket.find({_id: userID})
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
