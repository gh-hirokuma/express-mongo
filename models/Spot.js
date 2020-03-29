const { Schema, mongoose } = require("../utils/db");

const Spot = new Schema({
  name: {
    type: String,
    required: [true, "NAME is missing"]
  },
  location: {
    type: String,
    required: [true, "LOCATION is missing"]
  },
  country:{
    type: String,
    required: [true, "Select COUNTRY"]
  },
  creature: String,
  note: String,
  depth: Number,
  image: String,
  created_at: Number,
  updated_at: Number
});

exports.Spot = mongoose.model("Spot", Spot);
