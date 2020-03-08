var express = require("express");
const passport = require("passport");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express", user: req.user });
});

router.get("/failure", function(req, res, next) {
  res.render("failure", { title: "Express" });
});


router.get("/signin", function(req, res, next) {
  res.render("signin", { title: "Express" });
});

router.get("/signup", function(req, res, next) {
  res.render("signup", { title: "Express" });
});

router.post(
  "/auth",
  (req, res, next) => {
    next();
  },
  passport.authenticate("local", {
    failureRedirect: "/failure"
  }),
  (req, res) => {
    // console.log(req.user);
    res.redirect("/");
  }
);

router.post("/logout", (req, res) => {
  req.session.passport.user = undefined;
  res.redirect("/");
});

module.exports = router;
