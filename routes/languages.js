const express = require('express');
const router = express.Router();
const Language = require('../models/languages');


/* GET users listing. */
router.get('/', async(req, res)=> {

const Languages = await Language.find({});
res.status(200).json({
Languages
})
});

module.exports = router;
