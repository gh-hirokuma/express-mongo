var express = require("express");
var router = express.Router();
import { User } from "../models/User";
import { v1 } from 'uuid'
var multer = require("multer");

/* GET log listing. */
router.get("/", function(req, res, next) {
  User.find({}, function (err, users) {
    if (err) console.log(err)
    console.log(users)
    res.render("divelogs/index", { title: "DiveLog", slug: 'divelogs', result: users })
  }).populate('divelog')
});


module.exports = router;
