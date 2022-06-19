function RegisterVaccinController() {
    const SELF = {
    };
    return {
        index: async (req, res, next) => { 
            try {
                fetch('https://provinces.open-api.vn/api/?depth=3')
                    .then(response => response.json())
                    .then(locations => {
                        if (locations) {
                            fetch('http://localhost:3000/branch/list')
                                .then(response => response.json())
                                .then(branchs => {
                                    if (branchs) {
                                        res.render('registerVaccinational', {locations, branchs})   
                                    }
                                });
                        }
                    });
            } catch (error) {
                return res.status(400).json(error);
            }
        },
    };
}

module.exports = new RegisterVaccinController();
