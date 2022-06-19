const mongoose = require("mongoose");
const schema = mongoose.Schema;

const Branch = new schema(
  {
    name: { type: String , require: true},
    address: {type: String, require: true},
    phone: {type: String, require: true}
  },
  { timestamps: true }
);

module.exports = mongoose.model("branch", Branch);
