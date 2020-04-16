var express = require("express");
const { isAuthenticated } = require("../utils/auth");
const { User } = require("../models/User");
var router = express.Router();

/* GET home page. */

// router.get("/", function(req, res, next) {
//   if (isAuthenticated(req.user)) {
//     res.render("users/dashboard", {
//       title: "Dashboard",
//       slug: "dashboard",
//       user: req.user
//     });
//   } else {
//     res.redirect("/signin");
//   }
// });

router.get("/", function(req, res, next) {
  if (isAuthenticated(req.user)) {
    // const { _id } = req.user;
    // const { userId } = req.params;
    // const isMe = userId === _id;

    User.find({}, (err, users) => {
      console.log(users);
    res.render("users/dashboard", {
      title: "Dashboard",
      slug: "dashboard",
      user: req.user,
      result: users
      // isMe
    });
  }).populate("divelogs");
} else {
  res.redirect("/signin");
}
});

module.exports = router;


// router.get("/", function(req, res, next) {
//   if (isAuthenticated(req.user)) {
//     User.find({}, function(err, users) {
//       if (err) console.log(err);
//       console.log(users);
//       res.render("divelogs/index", {
//         title: "Dive Log",
//         slug: "divelogs",
//         result: users
//       });
//     }).populate("divelogs");
//   } else {
//     res.redirect("/signin");
//   }
// });
