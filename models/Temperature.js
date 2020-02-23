import { Schema, mongoose } from "../utils/db";

const Temperature = new Schema({
  temperature: String
});

exports.Temperature = mongoose.model("Temperature", Temperature);
