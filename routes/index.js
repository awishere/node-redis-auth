var express = require('express');
const { path } = require('../app');
var router = express.Router();

/* GET home page. */
router.get('/login', function(req, res, next) {
 res.sendStatus('login.html',{
  root: path.join(__dirname)
 })
});

module.exports = router;
