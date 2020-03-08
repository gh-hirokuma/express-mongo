import { Spot } from "./models/Spot";
import moment from 'moment'

var insertingSpot = new Spot({
  name: 'Chumpon Pinnacle',
  location: 'Koh Tao',
  creature: 'Whale Shark, Turtle, Barracuda',
  note: '1.5 hrs by boat',
  depth: 28,
  created_at: moment().unix(),
  updated_at: moment().unix(),
});

var insertingSpot = new Spot({
  name: 'Koh Khrok',
  location: 'Chonburi',
  creature: 'none',
  note: '1 hr by boat from Pattaya',
  depth: 17.5,
  created_at: moment().unix(),
  updated_at: moment().unix(),
});


var insertingSpot = new Spot({
  name: 'Barracuda Lake',
  location: 'Coron Islands',
  creature: 'none',
  note: 'fresh water and salt water',
  depth: 19,
  created_at: moment().unix(),
  updated_at: moment().unix(),
});


var insertingSpot = new Spot({
  name: 'Eal Garden',
  location: 'Menjangan Island',
  creature: 'Turtle',
  note: 'Coral reef',
  depth: 30,
  created_at: moment().unix(),
  updated_at: moment().unix(),
});

var insertingSpot = new Spot({
  name: 'Aban-Aban',
  location: 'Coron Islands',
  creature: 'Dugong',
  note: 'Warm',
  depth: 9,
  created_at: moment().unix(),
  updated_at: moment().unix(),
});
moment().unix(),


import { User } from "./models/User";
import moment from 'moment'

var insertingUser = new User({
  name: 'Aska',
  certificate: 'Advanced Open Water',
  country: 'Japan',
  DOB: moment('1986-06-02'),
  created_at: moment().unix(),
  updated_at: moment().unix(),
});



// ドキュメントの保存
insertingSpot.save(function(err) {
  if (err) console.log(err);
});

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
