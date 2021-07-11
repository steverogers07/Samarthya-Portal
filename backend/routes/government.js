var express = require('express');
var router = express.Router();

var government = require("../controllers/government");

router.post("/create_government", government.create_government, (req,res,next) => {});

router.post("/read_government", government.read_government, (req,res,next) => {});

router.get("/read_all_government", government.read_all_government, (req,res,next) => {});

router.post("/update_government", government.update_government, (req,res,next) => {});


module.exports = router;