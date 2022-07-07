const mongoose = require("mongoose");
const schema = mongoose.Schema;
const ObjectId = schema.ObjectId;

const customerSchema = new schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, default: '12345678' },
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
        relPerson: [
            {
                _id: { type: ObjectId },
                name: { type: String },
                phone: { type: String},
                birth: { type: Date },
                sex: { type: String },
                type: { type: String },
                address: {
                    region: { type: String, enum: ['mienbac', 'miennam', 'mientrung'] },
                    province: { type: String },
                    district: { type: String },
                    ward: { type: String },
                    address: { type: String },
                },
            }
        ]
    });

module.exports = mongoose.model("customer", customerSchema);