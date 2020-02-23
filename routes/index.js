var express = require("express");
var router = express.Router();
import { SakeType } from "../models/SakeType";

/* GET home page. */
router.get("/", (req, res, next) => {
  SakeType.find({}, (err, result) => {
    res.render("index", { title: "Express", result: result });
  });
});

module.exports = router;
