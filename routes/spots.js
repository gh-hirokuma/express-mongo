var express = require("express");
var router = express.Router();
import { Spot } from "../models/Spot";

/* GET users listing. */
router.get("/", function(req, res, next) {
  Spot.find({}, (err, result) => {
    res.render("spots/index", { title: "Dive Spots", result: result });
  })
});

router.get("/new", function(req, res, next) {
  Spot.find({}, (err, result) => {
    res.render("spots/new", { title: "Dive Spots"});
  })
});

module.exports = router;
