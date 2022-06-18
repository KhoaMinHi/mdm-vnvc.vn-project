const mongoose = require("mongoose");
const schema = mongoose.Schema;

const CategoryVaccine = new schema(
  {
    name: { type: String , require: true},
  },
  { timestamps: true }
);

module.exports = mongoose.model("category-vaccine", CategoryVaccine);
