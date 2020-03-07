var express = require("express");
var router = express.Router();
const { User } = require("../models/User");

/* GET log listing. */
router.get("/", function(req, res, next) {
  User.find({}, function(err, users) {
    if (err) console.log(err);
    console.log(users);
    res.render("divelogs/index", {
      title: "DiveLog",
      slug: "divelogs",
      result: users
    });
  }).populate("divelogs");
});

module.exports = router;
