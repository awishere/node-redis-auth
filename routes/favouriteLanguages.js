const express = require('express');
const favouriteLanguage = require('../models/favouriteLanguage');
const authenticated = require('../middleware/auth.middleware');
const Language = require('../models/languages');

const router = express.Router();


router.post('/' ,  async (req,res)=>{

const{ _id:userId }= req.session.user;
const{ languageId }=req.body;
if(!languageId){
    return res.status(400).json({
        message:'LanguageId missing'
    })
}
const language = await favouriteLanguage.findOneAndUpdate({
    user:userId,

},{
    language: languageId
},
{
    upsert:true,
    new:true
}


);
res.status(200).json(
    language
)

})

router.get('/',async(req,res)=>{
    const {_id:userId}=req.session.user;
    const favLanguage = await favouriteLanguage.findOne({user:userId}).populate(["language"]);
    res.status(200).json({
        language:favLanguage?.language || null
    });
})

module.exports= router;