const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session=require('express-session');
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const {createClient}= require('redis');
const connectRedis = require('connect-redis');
const { RedisClient } = require('redis');
const e = require('express');
const redisClient= createClient({legacyMode:true});

require('dotenv').config();

const RedisStore= connectRedis(session);
redisClient.connect().catch(e =>console.log("could not connect to redis",e));
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const sessionConfig={
    store:new RedisStore({client:redisClient}),
    resave:false, 
    saveUninitialized:false,
    secret: process.env.SESSION_SECRET,
    cookie:{
        secure:false,
        httpOnly:false,
        maxAge:1000*60*10,
    }
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
    res.json({viewCount: 'View Count is : '+ req.session.viewCount});
  
}
);
module.exports = app;
