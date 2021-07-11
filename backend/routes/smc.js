var express = require('express');
var router = express.Router();
var smc = require("../controllers/smc");

router.post("/create_smc", smc.create_smc, (req,res,next) => {});

router.get("/read_all_smc", smc.read_all_smc, (req,res,next) => {});

router.post("/read_smc", smc.read_smc, (req,res,next) => {});

router.post("/update_smc", smc.update_smc, (req,res,next) => {});

module.exports = router;