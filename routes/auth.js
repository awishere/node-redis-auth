var express = require('express');
var router = express.Router();
const User = require('../models/users');
const authenticated = require('../middleware/auth.middleware');


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
    message: e.message
  })
}

});

router.post('/login', async (req, res)=> {
  const {username,password}=req.body;
  const existingUser= await User.findOne({username});
  if(!existingUser){
    return res.status(400).json({
      message:"User does not exist"
    })
  }else if(!existingUser.comparePassword(password)){
    return res.status(400).json({
      "message":"Incorrect Password"
    })
  } 
  const user =existingUser.toJSON();
  delete user.password;
   req.session.user=user;
    res.status(200).json({
     user
    });
  });
  router.get('/me', async (req, res)=> {
    const { username } = req.session.user;
    const user = await User.findOne({username},{password:0});
    res.status(200).json({
      user
    })
     });
router.get('/logout', async (req, res)=> {
   req.session.destroy((err)=>{
    if(err){
      return res.status(400).json({
        message:err.message
      })
    }
    res.redirect('/login');
   });
    });
module.exports = router;
