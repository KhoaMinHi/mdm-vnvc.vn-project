const mongoose = require("mongoose");
const schema = mongoose.Schema;

const InjectionTicket = new schema(
  {
    vaccineID: { type: String , require: true},
    branchID: {type: String, require: true},
    dateInject: {type: String, require: true},
    accountID: {type: String, require: true},
    injectPersonID: {type: String, require: true},
    status: {type: Number, default: 0} 
  },
  { timestamps: true }
);

module.exports = mongoose.model("injection-ticket", InjectionTicket);
