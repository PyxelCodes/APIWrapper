import fs from 'fs';
import path from 'path'
import Cors from 'cors'

const cors = Cors({
    methods: ['GET'],
    origin: '*'
})

function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result)
            }

            return resolve(result)
        })
    })
}

export default async function (req, res) {

    await runMiddleware(req, res, cors)

    let final = [];

    let rds = fs.readdirSync(path.join(__dirname, '../../../../public/markdown'))


    for (let i = 0; i < rds.length; i++) {

        let item = rds[i];

        if (item.endsWith('.md')) {

            final.push({ type: 'file', data: item.replace('.md', '') });

            continue;
        }

        // assume its a dir

        let format = { type: 'dir', dirname: item, files: [] }

        fs.readdirSync(path.join(__dirname, '../../../../public/markdown', item)).forEach(file => {
            format.files.push(file.replace('.md', ''))
        })

        final.push(format)
    }

    res.send(final)

}