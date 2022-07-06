const mongoose = require("mongoose");
const schema = mongoose.Schema;

const orderTicket = new schema(
{
    accountID: {type: String},
    vaccineChoose: {type: Array, required: true},
    branchID: {type: String, required: true},
    status: {type: String, default: 'Wait for check out'}
},
{ timestamps: true }
);

module.exports = mongoose.model("order-tickets", orderTicket);
