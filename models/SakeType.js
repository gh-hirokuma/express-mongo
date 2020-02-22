const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SakeType = new Schema({
  name: String,
  sake: { type: Schema.Types.ObjectId, ref: "Sake" }
});

const conn = "mongodb://root:password@localhost:27017/sake?authSource=admin";
mongoose.connect(conn);

exports.SakeType = mongoose.model("SakeType", SakeType);
