const authenticated =(req,res,next)=>{
    if(!req.session.user){
        return res.status(401).json({
            message:'Not Authorized'
        })

    }
    next();
}
module.exports = authenticated