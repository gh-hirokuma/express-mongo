var express = require("express");
const { isAuthenticated } = require("../utils/auth");
const { User } = require("../models/User");
// const { DiveLog } = require("../models/DiveLog");
var router = express.Router();

router.get("/", function(req, res, next) {
  if (isAuthenticated(req.user)) {
    User.findOne({_id: req.user._id}, (err, result) => {
      console.log(result);
    res.render("users/dashboard", {
      title: "Dashboard",
      slug: "dashboard",
      user: req.user,
      result,
    });
  }).populate({ path: "divelogs", populate: { path: "spot" }});
} else {
  res.redirect("/signin");
}
});

module.exports = router;
