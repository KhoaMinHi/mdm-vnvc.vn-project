const mongoose = require("mongoose");
const schema = mongoose.Schema;
const ObjectId = schema.ObjectId;

const relPerson = new schema (
    {
        name: { type: String},
        birth: { type: Date },
        sex: { type: String },
        type: { type: String },
        phone: {type: String},
        email: { type: String },
        address: {
            region: { type: String, enum: ['mienbac', 'miennam', 'mientrung'] },
            province: { type: String },
            district: { type: String },
            ward: { type: String },
            address: { type: String },
        },
    }
)

const customerSchema = new schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        active: { type: Boolean, default: false },
        code: { type: Number, default: null },
        phone: { type: String, required: true },
        name: { type: String, required: true },
        birth: { type: Date, required: true },
        sex: { type: String, required: true },
        address: {
            region: { type: String, enum: ['mienbac', 'miennam', 'mientrung'] },
            province: { type: String, required: true },
            district: { type: String, required: true },
            ward: { type: String, required: true },
            address: { type: String, required: true },
        },
        relPerson: [relPerson]
    });

module.exports = mongoose.model("customer", customerSchema);