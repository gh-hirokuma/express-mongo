import { Spot } from "./models/Spot";
import moment from 'moment'

var insertingSpot = new Spot({
  name: 'Aban-Aban',
  location: 'Coron Islands',
  creature: 'Dugong',
  note: 'Warm',
  depth: 9,
  image: 'src="/https://images.unsplash.com/photo-1542517477-bcecaecf6817?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2689&q=80"',
  updated_at: moment().unix(),
});


// ドキュメントの保存
insertingSpot.save(function(err) {
  if (err) console.log(err);
});
