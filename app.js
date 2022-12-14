const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session=require('express-session');
require('dotenv').config();
require('./dbConnect')();
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const languagesRouter = require('./routes/languages');
const FavouriteLanguageRouter = require('./routes/favouriteLanguages');


const {createClient}= require('redis');
const connectRedis = require('connect-redis');
const { RedisClient } = require('redis');
const e = require('express');
const redisClient = createClient({
    url: process.env.REDIS_URL,
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    legacyMode: true,
  });

require('dotenv').config();

const RedisStore= connectRedis(session);
redisClient.connect().catch(e =>console.log("could not connect to redis",e));
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
const sessionConfig={
    store:new RedisStore({client:redisClient}),
    resave:false, 
    saveUninitialized:false,
    secret: process.env.SESSION_SECRET,
    cookie:{
        secure:false, //if true only transmit cookie over https
        httpOnly:false,// if true prevent client side JS from reading cookie
        maxAge:1000*60*10, // session max 
    }
};
app.use(session(sessionConfig));
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/languages', languagesRouter);
app.use('/favourite-languages', FavouriteLanguageRouter);

app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
