import passport from 'passport';
import DiscordStrategy from 'passport-discord';
import config from '../config';
import { encrypt } from '../utils/auth'
import creds from '../schemas/oauth2'
import User from '../schemas/user'

interface User {
    discordId?: string
}

passport.serializeUser((user: User, done) => {
    done(null, user.discordId)

})

passport.deserializeUser(async(discordId, done) => {
    try {
        const user = await User.findOne({ discordId })
        return user ? done(null, user) : done(null, null)
    } catch (error) {
        console.log(`${error}`)
        done(error, null)
    }
})



passport.use(new DiscordStrategy({
    clientID: config.discord.id,
    clientSecret: config.discord.secret,
    callbackURL: config.discord.callbackURL,
    scope: ['identify'],
}, async (accessToken: string, refreshToken: string, profile: any, done: Function) => {
    let eaccess = encrypt(accessToken);
    let erefresh = encrypt(refreshToken);
    let { id, username, discriminator, avatar } = profile;

    console.log(profile, accessToken)

    try {
        let finduser = await User.findOneAndUpdate({ discordId: id }, {
            discordTag: discriminator,
            avatar,
            username
        }, { new: true })


        let findCreds = await creds.findOneAndUpdate({
            accessToken: eaccess,
            refreshToken: erefresh,
        }, { new: true })


        if (!findCreds) {
            await creds.create({
                discordId: id,
                accessToken: eaccess,
                refreshToken: erefresh
            })
        }

        if (finduser) {
            return done(null, finduser);
        } else {
            let newUser = await User.create({
                discordId: id,
                discordTag: discriminator,
                avatar,
                username,
            })

            await creds.create({
                discordId: id,
                accessToken: eaccess,
                refreshToken: erefresh
            })

            return done(null, newUser)

        }
    } catch (error) {
        console.log(error);
        return done(error, null)
    }
}

))