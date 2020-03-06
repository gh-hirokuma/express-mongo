import { Schema, mongoose } from "../utils/db";

const DiveLog = new Schema({
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
  updated_at: Number,
});

exports.DiveLog = mongoose.model("DiveLog", DiveLog);
