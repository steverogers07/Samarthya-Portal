var express = require('express');
var router = express.Router();
var grievance = require("../controllers/grievance");

router.post("/create_grievance", grievance.create_grievance, (req,res,next) => {});

router.post("/read_grievance", grievance.read_grievance, (req,res,next) => {});

router.get("/read_all_grievances", grievance.read_all_grievances, (req,res,next) => {});

router.post("/update_grievance", grievance.update_grievance, (req,res,next) => {});

router.post("/send_mail", grievance.send_mail, (req,res,next) => {});

router.get("/schedule_reminder", grievance.schedule_reminder, (req,res,next) => {});

module.exports = router;