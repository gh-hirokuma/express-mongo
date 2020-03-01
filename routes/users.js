var express = require("express");
var router = express.Router();
import { User } from "../models/User";

/* GET users listing. */
router.get("/", function(req, res, next) {
  User.find({}, (err, result) => {
    res.render("user/index", { title: "Users", result: result });
  })
});

module.exports = router;
