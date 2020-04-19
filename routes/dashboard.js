var express = require("express");
const { isAuthenticated } = require("../utils/auth");
const { User } = require("../models/User");
const { DiveLog } = require("../models/DiveLog");
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
    User.find({}, (err, users) => {
      console.log(users);
    res.render("users/dashboard", {
      title: "Dashboard",
      slug: "dashboard",
      user: req.user,
      result: users

    });
  }).populate("divelogs").populate("spots");
} else {
  res.redirect("/signin");
}
});

module.exports = router;
