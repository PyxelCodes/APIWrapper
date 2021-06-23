import express, { Response } from 'express';
import session from 'express-session';
import cors from 'cors';
import connectMongo from 'connect-mongo';
import User from './schemas/user';
import passport from 'passport';
import config from './config';
import routes from './routes/index';
import mongoose from 'mongoose';

let app = express()
let Store = connectMongo(session)

mongoose.connect(config.mongoenv.uri, config.mongoenv.options)

import './auth/discord'; // load strat;

app.use(passport.initialize())
app.use(passport.session())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? 'https://stats.reefraid.com' : 'http://localhost:3000',
    credentials: true
}))
app.use(session({
    secret: config.api.session.secret,
    cookie: config.api.session.cookie,
    resave: false,
    saveUninitialized: false,
    store: new Store({ mongooseConnection: mongoose.connection })
}))

app.get('*', async (req: any, res, next) => { 
    let user = await User.findOne({ discordId: (req as any).session?.passport?.user });
    req.user = user;
    next()
})

let version = 1;

app.use(`/v${version}`, routes)


app.listen(80, () => console.log('api online'))