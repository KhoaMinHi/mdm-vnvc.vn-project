const ticketModel = require('../models/injectionTicket')

function TicketController() {
    const SELF = {
    };
    return {
        add: async (req, res, next) => {
            try {
                formData = req.body
                console.log(formData)
                let injectData = new ticketModel;
                if (!formData['vaccineChoosed'] || !formData['branchWant'] || !formData['dateInject']){
                    return res.status(400).json({
                        status: "Fail",
                        message: "Param input fail"
                    })
                }
                injectData.accountID = formData['accountID']
                injectData.vacciniesChoosed = formData['vaccineChoosed']
                injectData.branchID = formData['branchWant']
                injectData.dateInject = formData['dateInject']
                injectData.injectPersonID = formData['injectPersonID']

                await injectData.save()
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
                let ticketlist = await ticketModel.find({accountID: userID})
                return res.status(200).json({ticketlist})
              } catch (error) {
                return res.status(400).json(error);
              }
        }
    };
}
  
module.exports = new TicketController();
  