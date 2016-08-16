var express = require('express');
var router = express.Router();
var ERRORS=require('../errors/errors');
var User=require('../models/user');
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

function generateSignInUpHandler(title) {
    return function (req, res, next) {
      var err = null;
      
      if (!req.body.email) {
        err = ERRORS.MISSING_EMAIL;
      } else if (!req.body.password) {
        err = ERRORS.MISSING_PASSWORD;
      }
      
      if (err) {
        return res.render('signin', { error: err, title: title });
      }
      
      next();
    }
}

router.post("/signin", generateSignInUpHandler("Sign In"));
router.post("/signup", generateSignInUpHandler("Sign up"));
router.post("/signup", function (req, res, next) {
  var err = req.body.password !== req.body.confirmpassword ? ERRORS.PASSWORDS_DO_NOT_MATCH : null;
  if (err) {
    return res.render('signin', { error: err, title: "Sign Up" });
  }
  next();
});

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

  User.findOne({
    email:req.body.email,
    password: req.body.password
  }, function(err,user) {
  var error=null;
	  if (err) {
	  	error = err;
	  } else if (!user) {
		error = ERRORS.INCORRECT_CREDENTIALS;
	  }
	  if (error) {
		  return res.render('signin', { error: error, title: 'Sign in' });
	  }
	req.session.user = req.body;
	res.redirect("/");
  })
  });

router.post('/signup',function(req,res){
  
     var user= new User({
      email: req.body.email,
      password:req.body.password
      });
     user.save(function (err) {
      if (err) {
        return res.render('signin', { error: err.message, title: 'Sign up' });      
      }
      res.redirect("/signin");
     });
  
  });
module.exports = router;
