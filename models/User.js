import { Schema, mongoose } from "../utils/db";

const User = new Schema({
  name: String,
  certificate: String,
  country: String,
  DOB: Date,
  email: String,
  password: String,
  created_at: Number,
  updated_at: Number,
});

exports.User = mongoose.model("User", User);
