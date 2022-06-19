function RegisterVaccinController() {
    const SELF = {
    };
    return {
        index: async (req, res, next) => { 
            try {
                fetch('https://provinces.open-api.vn/api/?depth=3')
                    .then(response => {
                        console.log('not oke');
                        if (response.ok) {    
                            console.log(response.json());     
                            return response.json()
                        } else {
                            console.log("err");
                            alert("err");
                        }   
                    })
                    .then(data=>{
                        console.log(data);
                    })
                    .then(locations => {
                        if (locations) {
                            fetch('http://localhost:3000/branch/list')
                                .then(response => response.json())
                                .then(branchs => {
                                    if (branchs) {
                                        console.log(locations);
                                        res.render('registerVaccinational', {locations, branchs})  ;
                                    }
                                });
                        
                        }
                        console.log('not oke');
                    })
                    .catch(err => {
                        console.log('not oke');
                        console.log(err)});
            } catch (error) {
                return res.status(400).json(error);
            }
        },
    };
}

module.exports = new RegisterVaccinController();

