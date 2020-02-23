import { Schema, mongoose } from "../utils/db";

const SakeType = new Schema({
  name: String,
  sake: { type: Schema.Types.ObjectId, ref: "Sake" }
});

exports.SakeType = mongoose.model("SakeType", SakeType);
