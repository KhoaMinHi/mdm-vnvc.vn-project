const fetch = require('node-fetch');

function orderVaccineController() {
    const SELF = {
    };
    return {
        index: async (req, res, next) => { 
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
                                        res.render('order', { locations, branchs });
                                    }
                                });
                        }
                    })
            } catch (error) {   
                return res.status(400).json(error);
            }
        },
        order: async (req, res, next) => {
            
        }
    };
}

module.exports = new orderVaccineController();

