const mongoose = require("mongoose");
const schema = mongoose.Schema;

const vaccineOder = new schema(
{
    cusId: {type: String, required: true},
    category_id: {type: String},
    vaccine_id: {type: String},
    branch_id: {type: String},
    dayVerify: {type: Number, required: true},
    orderDate: {type: Date, default: Date.now},
},
{ timestamps: true }
);

module.exports = mongoose.model("vaccineOder", vaccineOder);
