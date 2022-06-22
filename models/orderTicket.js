const mongoose = require("mongoose");
const schema = mongoose.Schema;

const orderTicket = new schema(
{
    vaccineChoose: {type: Array, required: true},
    branchID: {type: String, required: true},
    dateInject: {type: String, required: true},
    accountID: {type: String},
    injectPersonID: {type: String},
    status: {type: Number, default: 0}
},
{ timestamps: true }
);

module.exports = mongoose.model("order-tickets", orderTicket);
