const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session=require('express-session');
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');

require('dotenv').config();


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const sessionConfig={
    resave:false,
    saveUninitialized:true,
    secret: process.env.SESSION_SECRET,
};
app.use(session(sessionConfig));
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/hello',(req,res)=>{
    if(req.session.viewCount === undefined){
        req.session.viewCount =0;
    }else{
        req.session.viewCount++;
    }
    res.send('View Count is : '+ req.session.viewCount);
}
);
module.exports = app;
