var express = require("express");
var router = express.Router();
import { DiveLog } from "../models/DiveLog";

/* GET users listing. */
router.get("/", function(req, res, next) {
  DiveLog.find({}, (err, result) => {
    res.render("diveLog/index", { title: "DiveLog", result: result });
  })
});

module.exports = router;
