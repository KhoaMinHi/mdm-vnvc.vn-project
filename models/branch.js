const mongoose = require("mongoose");
const schema = mongoose.Schema;

const Branch = new schema(
  {
    name: { type: String , required: true},
    address: {type: String, required: true},
    phone: {type: String, required: true}
  },
  { timestamps: true }
);

module.exports = mongoose.model("branch", Branch);
