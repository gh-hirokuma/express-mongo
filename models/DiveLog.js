const { Schema, mongoose } = require("../utils/db");

const DiveLog = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  spot: { type: Schema.Types.ObjectId, ref: "Spot" },
  // spot_name: String,
  // location_name: String,
  // country: String,
  date: Date,
  entry: String,
  current: String,
  weather: String,
  air_temperature: Number,
  water_temperature: Number,
  depth: Number,
  duration: Number,
  note: String,
  created_at: Number,
  updated_at: Number
});

exports.DiveLog = mongoose.model("DiveLog", DiveLog);
