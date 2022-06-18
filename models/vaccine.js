const mongoose = require("mongoose");
const schema = mongoose.Schema;

const Vaccine = new schema(
  {
    name: { type: String , require: true},
    price: {type: Number, require: true},
    inventory_number: {type: Number, default: 100},
    desc: {type: String},
    desc_detail: {type: String},
    category_id: {type: String},
    type: {type: Number},
    origin: {type: String},
  },
  { timestamps: true }
);

module.exports = mongoose.model("vaccinies", Vaccine);
