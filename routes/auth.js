var express = require('express');
var router = express.Router();
const tempDB=[];

/* GET users listing. */
router.post('/register', function(req, res) {
const {username,password}=req.body;
const existingUser=tempDB.find((user)=> user.username === username);
if(existingUser){
  return res.status(400).json({
    message:"User already Exists"
  })
}
const user={
  username,
  password
};
tempDB.push(user)
req.session.user=user;
  res.status(200).json({
    user
  });
});

router.post('/login', function(req, res) {
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
