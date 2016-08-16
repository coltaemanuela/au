var express = require('express');
var router = express.Router();
var ERRORS=require('../errors/errors');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { user:req.session.user, title: 'Express' });
});

router.get(["/signin", "/signup"], function (req, res, next) {
  if (req.session.user) { 
     return res.redirect('/');
   }
   next();
})

router.get('/signup',function(req,res){
   
  res.render('signin', { title: 'Sign up' });
  }); //tot signin pt cs pastreaza template-ul

router.get('/signin',function(req,res){
  res.render('signin', { title: 'Sign in' });
  });

router.post('/signout',function(req,res){
  req.session.destroy();
  res.redirect('/signin');
  });

router.post('/signin',function(req,res,next){

  if (req.body.email==="foo@email.com" && req.body.password==="123") {
    //express va salva sessionData in mongoDB
    req.session.user=req.body;
    return res.redirect('/');
  }
  var error=ERRORS.INCORRECT_CREDENTIALS ;
  res.render('signin', { error: error, title: 'Sign in' });
  });

router.post('/signup',function(req,res){
  
  });
module.exports = router;
