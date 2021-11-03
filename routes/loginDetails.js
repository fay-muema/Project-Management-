var express = require('express');
var router = express.Router();
const mongoose = require ('mongoose');
var loginmodel =  require("../models/login")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Login_Details are here');
});

// router.post('/add', function(req, res, next) {

//   let  loginDetails = new loginmodel({
//     username: "faith muema",
//     password: "123"
//   })
//   res.send(loginDetails);
// });

router.post('/add', function(req, res, next) {


  // console.log(req.body)
  let loginDetails = new loginmodel({
    username: req.body.username,
    password: req.body.password
    
  });
  loginDetails.save(function(err, loginDetails){
    if (err)
    res.send(err)  
    else
    res.send({message: "LogIn is Successful", loginObj: loginDetails});
    
    
  });
// }catch(e){
//   console.log(e)
// }

});
router.get('/list', function(req, res, next) {


  loginmodel.find(function(err, response){
    if (err)
    res.send(err)  
    else
    res.send({resultsFound:response.length, username: response});
    
    
  });


});

router.get('/searchByUsername', function(req, res, next) {

const userNameQuery = req.query.username;
  loginmodel.find({username: userNameQuery}, function(err, response){
    if (err)
    res.send(err)  
    else
    res.send({resultsFound:response.length,username: response});
    
    
  });


});
router.get('/searchById', function(req, res, next) {

  const idQuery = req.query.id;
    loginmodel.find({idQuery}, function(err, response){
      if (err)
      res.send(err)  
      else
      res.send({resultsFound:response.length, id: response});
      
      
    });
  
  
  });
module.exports = router;