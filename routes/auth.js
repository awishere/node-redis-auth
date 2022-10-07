var express = require('express');
var router = express.Router();
const User = require('../models/users');
const tempDB=[];

/* GET users listing. */
router.post('/register', async(req, res)=> {
const {username,password}=req.body;
const existingUser= await User.findOne({username});
if(existingUser){
  return res.status(400).json({
    message:"User already Exists"
  })
}
try{
  const savedUser = await new User({
    username,
    password
  }).save();
  const user = savedUser.toJSON();
  req.session.user=user
  delete user.password;
  res.status(200).json({
    user: user
  });
} catch(e){
  res.status(400).json({
    message: err.message
  })
}

});

router.post('/login', async (req, res)=> {
  const {username,password}=req.body;
  const existingUser=tempDB.find((user)=> user.username === username);
  if(!existingUser){
    return res.status(400).json({
      message:"User does not exist"
    })
  }else if(existingUser.password != password){
    return res.status(400).json({
      "message":"Incorrect Password"
    })
  } 
    res.status(200).json({
      user:existingUser
    });
  });
module.exports = router;
