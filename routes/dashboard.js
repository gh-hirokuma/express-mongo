var express = require("express");
const { isAuthenticated } = require("../utils/auth");
const { User } = require("../models/User");
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
