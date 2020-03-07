// const { User } = require("./models/User");
// const moment = require("moment");

// var insertingUser = new User({
//   name: "Guillaume",
//   certificate: "Instructor",
//   country: "France",
//   DOB: moment("1985-07-24"),
//   email: "love2dive@dive.com",
//   password: "",
//   divelog: "5e6229ad101b5b0b9ff53213",
//   created_at: moment().unix(),
//   updated_at: moment().unix()
// });

// // ドキュメントの保存
// insertingUser.save(function(err) {
//   if (err) console.log(err);
// });

const { DiveLog } = require("./models/DiveLog");
const moment = require("moment");

var insertingDiveLog = new DiveLog({
  user: "5e63bc1d343e421df269bd37",
  dive_no: 1,
  date: moment("2019-07-24"),
  entry: "2Beach entry",
  current: "2No Current",
  weather: "2Cloudless",
  air_temperature: 29,
  water_temperature: 27,
  depth: 13,
  duration: 46,
  note: "2Advanced Open Water Course. Night dive. Beautiful little shrimps...",
  created_at: moment().unix(),
  updated_at: moment().unix()
});

// ドキュメントの保存
insertingDiveLog.save(function(err) {
  if (err) console.log(err);
});
