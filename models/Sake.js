const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Sake = new Schema({
  brand: String,
  sakeType: { type: Schema.Types.ObjectId, ref: "SakeType" },
  impressions: [
    {
      temperature: { type: Number, ref: "Temperature" },
      impression: String
    }
  ]
});

const conn = "mongodb://root:password@localhost:27017/sake?authSource=admin";
mongoose.connect(conn);

exports.Sake = mongoose.model("Sake", Sake);
