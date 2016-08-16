var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/signup',function(req,res,next){
  res.render('signin', { title: 'Sign up' });
  }); //tot signin pt cs pastreaza template-ul

router.get('/signin',function(req,res,next){
  res.render('signin', { title: 'Sign in' });
  });
module.exports = router;
