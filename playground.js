import { Spot } from "./models/Spot";
import moment from 'moment'

var insertingSpot = new Spot({
  name: req.body.name,
 
});


// ドキュメントの保存
insertingSpot.save(function(err) {
  if (err) console.log(err);
});
