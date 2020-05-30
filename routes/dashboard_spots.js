var express = require("express");
const { isAuthenticated } = require("../utils/auth");
const { Spot } = require("../models/Spot");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  if (isAuthenticated(req.user)) {
    Spot.find({}, (err, result) => {
    res.render("users/dashboard_spots", {
      title: "Dashboard",
      slug: "dashboard_spots",
      user: req.user,
      spot: result,
    });
  })
  } else {
    res.redirect("/signin");
  }
});

module.exports = router;
