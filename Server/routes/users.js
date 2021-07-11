var express = require('express');
var router = express.Router();
var user = require('../controllers/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/user_signup' ,user.user_signup ,function(req,res,next) {

});

router.post('/user_login', user.user_login, (req,res,next) => {});

router.post('/update_user', user.update_user, function(req,res,next) {

});

router.post('/read_user', user.read_user, function(req,res,next) {

});

router.get('/read_all_users', user.read_all_users, function(req,res,next) {

});

router.post('/delete_user', user.delete_user, function(req,res,next) {

});


router.post("/mailing_api", user.mailing_api, (req,res,next) => {});

module.exports = router;
