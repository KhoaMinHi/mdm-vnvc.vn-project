const fetch = require('node-fetch');

module.exports = function apiProvincesVN() {
    try {
        return fetch('https://provinces.open-api.vn/api/?depth=3')
        .then(res => res.json())
        .then(data => {return data})
    } catch (error) {
        console.log(error);
    }
}