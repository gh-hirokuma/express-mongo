import { DiveLog } from "./models/DiveLog";
import moment from 'moment'

var insertingDiveLog = new DiveLog({
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
