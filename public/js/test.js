
fetch("https://provinces.open-api.vn/api/?depth=3")
    .then(response => {
        if (response.ok) {    
            console.log(response.json());     
            return response.json()
        } else {
            alert("err");
        }   
    })
    .catch(err => {
        console.log(err);
});