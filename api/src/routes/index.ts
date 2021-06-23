import { Router, Request, Response } from 'express';
import { auth } from './handler'

let router: Router = Router();


router.use('/auth', auth)


router.get('/', (req: Request, res: Response) => {
    res.json({ __version: 1 })
})

export default router;