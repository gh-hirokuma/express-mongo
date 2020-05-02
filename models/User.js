const { Schema, mongoose } = require("../utils/db");

const User = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  certificate: String,
  country: String,
  DOB: Date,
  email: {
    type: String,
    validate: {
      validator: function(v) {
        return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          v
        );
      },
      message: props => `${props.value} is not an email address.`
    },
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        console.log(v);
        return /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/.test(v);
      },
      message: props => `Invalid password.`
    }
  },
  divelogs: [{ type: Schema.Types.ObjectId, ref: "DiveLog" }],
  image: String,
  created_at: Number,
  updated_at: Number
});

exports.User = mongoose.model("User", User);

