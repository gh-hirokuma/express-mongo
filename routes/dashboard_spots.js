var express = require("express");
const { isAuthenticated } = require("../utils/auth");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  if (isAuthenticated(req.user)) {
    res.render("users/dashboard_spots", {
      title: "Dashboard_spots",
      slug: "dashboard_spots",
      user: req.user
    });
  } else {
    res.redirect("/signin");
  }
});

module.exports = router;
