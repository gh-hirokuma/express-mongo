const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Temperature = new Schema({
  temperature: String
});

const conn = "mongodb://root:password@localhost:27017/sake?authSource=admin";
mongoose.connect(conn);

exports.Temperature = mongoose.model("Temperature", Temperature);
