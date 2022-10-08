const express = require('express');
const router = express.Router();
const Game = require('../models/games');


/* GET users listing. */
router.get('/', async(req, res)=> {

const Games = await Game.find({});
res.status(200).json({
Games
})
});

module.exports = router;
