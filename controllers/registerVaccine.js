const fetch = require('node-fetch');

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
        history: (req, res, next) => {
            try {
                if(req.user._id){
                    fetch(`http://localhost:3000/ticket/listByUserID/${req.user._id}`)
                        .then(response => response.json())
                        .then(historyList => {
                            if (historyList) {
                                for(let item of historyList){
                                    
                                }
                                res.render('registerVaccinational', { historyList });
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
