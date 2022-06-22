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
            if (!formData['vaccineChoosed'] || !formData['branchWant'] || !formData['dateInject']){
                return res.status(400).json({
                    status: "Fail",
                    message: "Param input fail"
                })
            }
            cusData.email = formData['emailContact']
            cusData.phone = formData['phoneContact']
            cusData.name = formData['nameInject']
            cusData.birth = formData['birthInject']
            cusData.sex = formData['genderInject']
            cusData.province = formData['inputCity']
            cusData.district = formData['inputDistrict']
            cusData.ward = formData['inputWard']
            cusData.address = formData['street']

            orderData.accountID = formData['accountID']
            orderData.vaccineChoose = formData['vaccineChoosed']
            orderData.branchID = formData['branchWant']
            orderData.dateInject = formData['dateInject']
            orderData.injectPersonID = formData['injectPersonID']
            console.log(cusData)
            await orderData.save()
            return res.status(200).json({
                status: "Success"
            })
            } catch (error) {
            return res.status(400).json(error);
            }
    },
    listByUserID: async (req, res, next) => {
        try {
            let userID = req.body.userID
            let orderList = await orderTicket.find()
            return res.status(200).json({orderList})
            } catch (error) {
            return res.status(400).json(error);
            }
    }
};
}

module.exports = new orderTicketController();
