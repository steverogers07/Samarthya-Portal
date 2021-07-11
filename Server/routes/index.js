var express = require('express');
var router = express.Router();
var userRouter = require("./users");
var grievanceRouter = require("./grievance");
var followupRouter = require("./followup");
var smcRouter = require("./smc");
var governmentRouter = require("./government");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.use("/user", userRouter);

router.use("/grievance", grievanceRouter);

router.use("/followup", followupRouter);

router.use("/smc", smcRouter);

router.use("/government", governmentRouter);

module.exports = router;
