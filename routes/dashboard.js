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
    const { userId } = req.params;
    User.find({_id: userId}, (err, result) => {
      console.log(result);
    res.render("users/dashboard", {
      title: "Dashboard",
      slug: "dashboard",
      // user: req.user,
      result,
    });
  }).populate("divelogs");
} else {
  res.redirect("/signin");
}
});

module.exports = router;
