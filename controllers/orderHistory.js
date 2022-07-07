const fetch = require('node-fetch');
const orderTicket = require('../models/orderTicket')
module.exports = function oderHistoryController() {
    const SELF = {
    };
    return {
        index: async(req, res, next) => {
            try {
                // fetch('http://localhost:3000/orderTicket/listByUserID/' + new URLSearchParams({
				// 	id: userId,
				// }))
                //     .then(response => {
                //         if (response.ok) {
                //             return response.json();
                //         } else {
                //             console.log("err");
                //             alert("err");
                //         }
                //     })
                //     .then(orderList => {
                //         if (orderList) {
                //             // fetch('http://localhost:3000/branch/list')
                //             //     .then(response => response.json())
                //             //     .then(branchs => {
                //             //         if (branchs) {
                //             //             res.render('registerVaccinational', { orderList, branchs });
                //             //         }
                //             //     });
                //             console.log(orderList)
                //             res.render('orderHistory', { orderList});
                //         }
                //     })
                // const response = await fetch('http://localhost:3000/orderTicket/listByUserID/' + new URLSearchParams({id: userId}))
				// const orderList = await response.json();
                // console.log(orderList)
                let userId = req.params.id
                console.log(userId)
                let orderList = await orderTicket.find({userID: userId})
                console.log(orderList[2].vaccineChoose)
                res.render('orderHistory', { orderList});
            } catch (error) {
                return res.status(400).json(error);
            }
        },
    };
}
