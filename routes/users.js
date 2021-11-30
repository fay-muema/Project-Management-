var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

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

router.post("/login", async(req, res, next) => {
  try{
    const users = await user.findByCredentials(req.body.email, req.body.password);
    res.send({user});
  }

catch(e) {
  res.status(400).send({
    error: "invalid username"
  });
}
});
// router.post('/login', function(req, res, next) {
// userModel.findByCredentials({ email:req.body.email,password:req.body.password},(err, user)=>{
//   if (err)
//   res.send({error:'invalid userame'})  
// else{
//   res.send({data:{fullname:user.fullname,email:user.email,_id:user._id}});
// }
// })

// });


module.exports = router;
