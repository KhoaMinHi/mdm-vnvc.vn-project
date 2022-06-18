
fetch("https://provinces.open-api.vn/api/?depth=3")
    .then(response => {
        if (response.ok) {           
            return response.json()
        } else {
            alert("err");
        }   
    })
    .then(data => {
        response.render('registerVaccinational', {data})
    })
    .catch(err => {
        console.log(err);
});