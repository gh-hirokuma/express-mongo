import { User } from "./models/User";
import moment from 'moment'

var insertingUser = new User({
  name: 'Guillaume',
  certificate: 'Instructor',
  country: 'France',
  DOB: moment('1985-07-24'),
  email: 'love2dive@dive.com',
  password: '',
  divelog: '5e6229ad101b5b0b9ff53213',
  created_at: moment().unix(),
  updated_at: moment().unix(),
});


// ドキュメントの保存
insertingUser.save(function(err) {
  if (err) console.log(err);
});
