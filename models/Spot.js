import { Schema, mongoose } from "../utils/db";

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

exports.Sake = mongoose.model("Sake", Sake);
