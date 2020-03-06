var express = require("express");
var router = express.Router();
import { User } from "../models/User";
import moment from "moment";

//詳細表示
router.get("/:userId", function(req, res, next) {
  const { userId } =  req.params
  User.findOne({ _id: userId }, (err, result) => {
    res.render("users/show", { title: "User", data: {
      name: result.name
    } });
  })
});

/* GET users listing. */
router.get("/", function(req, res, next) {
  User.find({}, (err, result) => {
    res.render("users/index", { title: "User", result: result });
  })
});


module.exports = router;
