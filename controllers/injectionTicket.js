const ticketModel = require('../models/injectionTicket')

function TicketController() {
    const SELF = {
    };
    return {
        add: async (req, res, next) => {
            try {
                formData = req.body
                let injectData = new ticketModel;
                if (!formData['accountID'] || !formData['vaccineID'] || !formData['branchID'] || !formData['dateInject'] || !formData['injectPersonID']){
                    return res.status(400).json({
                        status: "Fail",
                        message: "Param input fail"
                    })
                }
                injectData.accountID = formData['accountID']
                injectData.vaccineID = formData['vaccineID']
                injectData.branchID = formData['branchID']
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
    };
}
  
module.exports = new TicketController();
  