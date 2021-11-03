var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
// var loginmodel =  require("../models/login")
// var registermodel =  require("../models/register")

var userModel = require("../models/logins");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('login successful!!!');
});
router.post('/register', function(req, res, next) {
  let registerDetails = new userModel ({
    fullname:req.body.fullname,
    email:req.body.email,
    password:req.body.password,
  });
  

    registerDetails.save(function(err, register){
      if (err)
      res.send({error:'Not successfull'})  
      else{
        res.send({data:{fullname:registerDetails.fullname,email:registerDetails.email,_id:registerDetails._id}});
      }
      
    });

  
});

router.post('/login', function(req, res, next) {
userModel.findOne({    email:req.body.email,password:req.body.password},(err, user)=>{
  if (err)
  res.send({error:'Not successfull'})  
else{
  res.send({data:{fullname:user.fullname,email:user.email,_id:user._id}});
}
})

  // let loginDetails = new userModel({
    // email:"faithmuema@gmail.com",
    // password:"1234"
    
  // });
  // loginDetails.find({...loginDetails},(err,user)=>{
  //   if (err)
  //   res.send({error:'Not successfull'})  
  // else{
  //   res.send({data:{fullname:loginDetails.fullname,email:loginDetails.email,_id:loginDetails._id}});
  // }
  // })

  // loginDetails.findOne(function(err, loginDetails){
  //   if (err)
  //   res.send(err)  
  //   else
  //   res.send({message: "LogIn is Successful", loginObj: loginDetails});
    
    
  // });
  
});


module.exports = router;
