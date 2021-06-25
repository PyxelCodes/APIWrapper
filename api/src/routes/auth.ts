
import { Router, Request, Response } from 'express';
import config from '../config'
import passport from 'passport';
import axios from 'axios';

let router: Router = Router();

router.get('/discord', passport.authenticate('discord'))

router.get('/discord/redirect', passport.authenticate('discord'), (req: Request, res: Response) => {
    res.redirect(config.baseUrl)
})

router.get('/', async (req: Request | any, res: Response) => {
    if (req.user) {

        let final: any = {}
        final.userData = (await axios.get(`https://api.reefraid.com/v1/users/${req.user.discordId}`, { headers: { Authorization: config.api.masterToken } })).data;
        final.user = req.user
        res.send(final)
    } else {
        res.status(401).send({ msg: 'Unauthorized' })
    }
})

router.get('/logout', (req, res) => {
    if(!req.user) return res.sendStatus(401)
    req.logOut();
    res.sendStatus(200);
})



export default router;
