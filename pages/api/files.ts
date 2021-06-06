import fs from 'fs';
import path from 'path'


export default function (req, res) {

    let final = [];

    let rds = fs.readdirSync(path.join(__dirname, '../../../../public/markdown'))


    for (let i = 0; i < rds.length; i++) {

        let item = rds[i];

        if(item.endsWith('.md')) {
            
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