function RegisterVaccinController() {
    const SELF = {
    };
    return {
        index: async (req, res, next) => { 
            try {
                fetch('https://provinces.open-api.vn/api/?depth=3')
                    .then(response => response.json())
                    .then(data => {
                        res.render('registerVaccinational', {data})
                    });
            } catch (error) {
                return res.status(400).json(error);
            }
        },
    };
}

module.exports = new RegisterVaccinController();
