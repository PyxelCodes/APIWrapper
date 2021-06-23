import CryptoJS from 'crypto-js'
import config from '../config'

export function encrypt (token: string) {
    return CryptoJS.AES.encrypt(token, config.AES).toString();
}

export function decrypt (token: string) {
    return CryptoJS.AES.decrypt(token, config.AES).toString()
}