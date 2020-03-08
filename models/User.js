const { Schema, mongoose } = require("../utils/db");
const { DiveLog } = require("./DiveLog");

const User = new Schema({
  username: String,
  certificate: String,
  country: String,
  DOB: Date,
  email: String,
  password: String,
  divelogs: [{ type: Schema.Types.ObjectId, ref: "DiveLog" }],
  created_at: Number,
  updated_at: Number
});

exports.User = mongoose.model("User", User);
