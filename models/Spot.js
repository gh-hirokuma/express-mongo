import { Schema, mongoose } from "../utils/db";

const Spot = new Schema({
  name: String,
  location: String,
  creature: String,
  note: String,
  depth: Number,
  image: String,
  created_at: Number,
  updated_at: Number,
});

exports.Spot = mongoose.model("Spot", Spot);
