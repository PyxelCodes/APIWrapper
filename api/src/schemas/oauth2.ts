import { Schema, model } from 'mongoose'

let oauth2 = new Schema({
    discordId: String,
    accessToken: String,
    refreshToken: String
})

export default model('oauth2', oauth2)