const fetch = require('node-fetch');
const moment = require('moment')

module.exports = function RegisterVaccinController() {
    const SELF = {
    };
    return {
        index: (req, res, next) => {
            try {
                fetch('https://provinces.open-api.vn/api/?depth=3')
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        } else {
                            console.log("err");
                            alert("err");
                        }
                    })
                    .then(locations => {
                        if (locations) {
                            fetch('http://localhost:3000/branch/list')
                                .then(response => response.json())
                                .then(branchs => {
                                    if (branchs) {
                                        res.render('registerVaccinational', { locations, branchs });
                                    }
                                });
                        }
                    })
            } catch (error) {
                return res.status(400).json(error);
            }
        },
        history: async (req, res, next) => {
            try {
                let result = []
                if(req.user._id){
                   await fetch(`http://localhost:3000/ticket/listByUserID/${req.user._id}`)
                        .then(response => response.json())
                        .then(historyList => {
                            if (historyList) {
                                fetch(`http://localhost:3000/customer/id/${req.user._id}`)
                                    .then(response => response.json())
                                    .then(customerInfo => {
                                        if (customerInfo) {
                                            for(let el of historyList.ticketlist){
                                                let personInject = {}
                                                if(el.injectPersonID === req.user._id) {
                                                    result.push({
                                                        "code": el._id,
                                                        "nameInject": req.user.name,
                                                        "createTime": moment(el.createdAt).format('YYYY/MM/DD hh:mm:ss'),
                                                        "status": el.status === 0 ? "Đã đăng ký" : "Đã tiêm",
                                                    })
                                                }else{
                                                    personInject = customerInfo.customers[0].relPerson.filter(item => item._id === el.injectPersonID)[0]
                                                    result.push({
                                                        "code": el._id,
                                                        "nameInject": personInject.name,
                                                        "createTime": moment(el.createdAt).format('YYYY/MM/DD hh:mm:ss'),
                                                        "status": el.status === 0 ? "Đã đăng ký" : "Đã tiêm",
                                                    })
                                                }
                                            }
                                            res.render('historyVaccine', { result });
                                        }
                                    });
                            }
                        });
                }else{
                    let data = "Vui lòng đăng nhập để xem lịch sử đăng ký tiêm chủng"
                    res.render('historyVaccine', { data });
                }
            } catch (error) {
                return res.status(400).json(error);
            }
        },
    };
}
