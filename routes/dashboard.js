var express = require("express");
const { isAuthenticated } = require("../utils/auth");
var router = express.Router();

/* GET home page. */

router.get("/", function(req, res, next) {
  if (isAuthenticated(req.user)) {
    res.render("users/dashboard", {
      title: "Dashboard",
      slug: "dashboard",
      user: req.user
    });
  } else {
    res.redirect("/signin");
  }
});

module.exports = router;


// router.get("/:userId/logs", function(req, res, next) {
//   if (isAuthenticated(req.user)) {
//     const { _id } = req.user;
//     const { userId } = req.params;
//     const isMe = userId === _id;

//     User.find({ _id: userId }, (err, result) => {
//     res.render("users/dashboard", {
//       title: "Dashboard",
//       slug: "dashboard",
//       user: req.user,
//       result,
//       isMe
//     });
//   }).populate("users");
//   } else {
//     res.redirect("/signin");
//   }
// });
