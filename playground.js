import { Spot } from "./models/Spot";
import moment from 'moment'

var insertingSpot = new Spot({
  name: 'Aban-Aban',
  location: 'Coron Islands',
  creature: 'Dugong',
  note: 'Warm',
  depth: 9,
  image: "/images/dugong.jpg",
  updated_at: moment().unix(),
});


// ドキュメントの保存
insertingSpot.save(function(err) {
  if (err) console.log(err);
});
