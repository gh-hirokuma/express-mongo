import { Sake } from "./models/Sake";
const { SakeType } = require("./models/SakeType");

var kuheiji = new Sake({
  brand: "醸し人九平次2",
  impressions: [
    { temperature: 7, impression: "めちゃうま" },
    { temperature: 10, impression: "激うま" }
  ]
});

// ドキュメントの保存
kuheiji.save(function(err) {
  if (err) console.log(err);

  const sakeType = new SakeType({
    name: "たいぷ",
    sake: kuheiji._id
  });

  sakeType.save(function(err) {
    if (err) console.log(err);
  });
});

var jokigen = new Sake({
  brand: "上喜元",
  type: 9,
  impressions: [
    { temperature: 7, impression: "フルーティ" },
    { temperature: 9, impression: "フレッシュ" }
  ]
});

jokigen.save(function(err) {
  if (err) throw err;
});

Sake.find({ _id: "5e49e755ab50315474b6d6bc" }, function(err, result) {
  if (err) throw err;
  console.log(result);
});

SakeType.find({}, function(err, result) {
  result.forEach(sakeType => {
    SakeType.findOne({ _id: sakeType._id })
      .populate("sake")
      .exec(function(err, type) {
        console.log(type);
      });
  });
});



location: 'Coron Islands',
creature: 'Dugong',
note: 'Warm',
depth: 9,
image: "/images/dugong.jpg",
updated_at: moment().unix(),


import { DiveLog } from "./models/DiveLog";
import moment from 'moment'

var insertingDiveLog = new DiveLog({
  user: '5e53cb19b89a7d0675222506',
  dive_no: 1,
  date: moment('2019-07-24'),
  entry: 'Beach entry',
  current: 'No Current',
  weather: 'Cloudless',
  air_temperature: 29,
  water_temperature: 27,
  depth: 13,
  duration: 46,
  note:'Advanced Open Water Course. Night dive. Beautiful little shrimps...',
  created_at: moment().unix(),
  updated_at: moment().unix(),
});


// ドキュメントの保存
insertingDiveLog.save(function(err) {
  if (err) console.log(err);
});
