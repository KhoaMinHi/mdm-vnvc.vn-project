const mongoose = require("mongoose");
const schema = mongoose.Schema;
const ObjectId = schema.ObjectId;

const customerSchema = new schema(
{
    email: { 
        type: String, 
        required: true, 
        unique: true
    },
    password: { type: String, required: true },
    active: { type: Boolean, default: false },
    phone: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    birth: {type: Date, required: true}, 
    sex: {type: String, required: true}, 
    region: {type: String, required: true, enum : ['mienbac','miennam', 'mientrung']}, 
    province: {type: String, required: true},
    district: {type: String, required: true}, 
    ward: {type: String, required: true}, 
    address: {type: String, required: true},
    longitude: {type: Number, required: true}, 
    latitude: {type: Number, required: true},
    relPerson: [
        { 
            id: {type: Number, required: true}, 
            name: {type: String, required: true},
            birth: {type: Date, required: true},
            sex: {type: String, required: true}, 
            type: {type: String, required: true} 
        }
    ]
});

module.exports = mongoose.model("customer", customerSchema);