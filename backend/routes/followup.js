var express = require('express');
var router = express.Router();
var followup = require("../controllers/followup");

router.post("/create_followup", followup.create_followup, (req,res,next) => {});

router.post("/read_followup", followup.read_followup, (req,res,next) => {});

router.get("/read_all_followups", followup.read_all_followups, (req,res,next) => {});

router.post("/update_followup", followup.update_followup, (req,res,next) => {});

module.exports = router;