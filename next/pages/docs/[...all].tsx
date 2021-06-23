import { useRouter } from 'next/router'
import React from 'react'
import {
    Parser
} from '../../utils/convert'
import axios from 'axios'
import Prism from 'prismjs'
import Head from 'next/head'
import Loader from "react-loader-spinner";
import fs from 'fs';
import path from 'path'

export default function Docs(props) {
    const router = useRouter()
    let [files, setFiles] = React.useState([])
    let [loading, setLoading] = React.useState(true)
    let [innerLoading, setInnerLoading] = React.useState(false)

    let [md, setMd] = React.useState(``)

    let [currentDoc, setCurrentDoc] = React.useState('')


    React.useEffect(() => {
        Prism.highlightAll()
    }, [loading])

    React.useEffect(() => {
        if (router.asPath !== router.route) {
            setFiles(props.files)

            let localFiles = props.files;

            let path = localFiles.find(x => x?.data?.includes((router.query.all as any).join('/')) ?? x?.files?.includes((router.query.all as any)[1]))

            if (!path) {
                for (let x1 in localFiles) {
                    let x2 = localFiles[x1]

                    if (x2.type === 'dir') {
                        for (let x3 in x2.files) {
                            let x4 = x2.files[x3]

                            if (x4.includes((router.query.all as any)[1])) path = `${x2.dirname}/${x4}`
                        }
                    }
                }
            }

            if (typeof path === 'object') path = path.data

            //path = path?.data ?? (router.query.all as any).join('/')
            setMd(props.md[path + '.md']);

            setCurrentDoc(path)

            setLoading(false);
        }
    }, [router])

    function firstUpperCase(string) {
        // we also do the Number()- slice here

        let i = string.indexOf('-');

        string = string.slice(i + 1)

        return (string.charAt(0).toUpperCase() + string.slice(1)).replace('_', ' ');
    }

    function ChangeDocument(evt) {
        setInnerLoading(true)
        let t = evt.target.ariaLabel;

        if (evt.target.classList.contains('selected-doc')) return;

        let l = t.split('/');
        let i = l.length;
        let s = l[i - 1]

        let f = files.find(x => x?.data?.includes(t) || x?.files?.includes(s))

        let x;

        if (Array.isArray(f.files)) {
            x = f.files.findIndex(x => x?.includes(s))
        }

        let final: any = {};

        if (f.dirname) {
            let x1: string, x2: string, x3: number, x4: number

            x3 = f.dirname.indexOf('-');
            x4 = f.files[x].indexOf('-');

            x1 = f.dirname.slice(x3 + 1);
            x2 = f.files[x].slice(x4 + 1)

            final.dirname = x1
            final.filename = x2
        }

        let k: string = f.data || final.dirname

        let fstring = '';

        fstring = String(f.data);

        if (k.match(/^[0-9]/g)) {
            if (f.data) fstring = fstring.slice(3);
            if (final.dirname) final.dirname = final.dirname.slice(3);
        }

        if (final?.filename?.match(/^[0-9]/g)) {
            final.filename = final.filename.slice(3)
        }

        //window.history.replaceState({}, '', `https://apiwrapper.vercel.app/docs/${fstring || final.dirname + '/' + final.filename}`)

        setCurrentDoc(f.data || f.files[x])

        if (!f.files) {
            setMd(props.md[t + '.md'])
        } else {

            let path = t.split('/')
            console.log(path)
            setMd(props.md[path[0]][path[1] + '.md'])

        }
        setInnerLoading(false);



    }



    console.log(md)

    let render = Parser(md)

    return (
        <>

            <Head>
                <title>
                    ReefRaid API Documentation
                </title>
            </Head>

            {
                !loading && (
                    <div id="doc-host">

                        <div id="sidebar">
                            <br />
                            <br />
                            {
                                files.map(f => {

                                    if (f.type === 'dir') return (

                                        <div>

                                            <h5> {firstUpperCase(f.dirname.replace('_', ' ').toUpperCase())} </h5>
                                            {
                                                f.files.map(t => {

                                                    return (
                                                        <p onClick={ChangeDocument} aria-label={f.dirname + '/' + t} style={{ cursor: 'pointer' }} className={`doc-item-folder ${currentDoc === t ? 'selected-doc' : ''}`}>
                                                            {
                                                                firstUpperCase(t)
                                                            }
                                                        </p>
                                                    )

                                                })
                                            }


                                        </div>



                                    )

                                    return (
                                        <p onClick={ChangeDocument} aria-label={f.data} style={{ cursor: 'pointer' }} className={currentDoc === f.data ? 'selected-doc' : ''} >
                                            {
                                                firstUpperCase(f.data)
                                            }
                                        </p>
                                    )
                                })
                            }
                        </div>

                        {
                            innerLoading ?
                                <div id="loader">
                                    <Loader
                                        type="Triangle"
                                        color="#febc57"
                                        height={100}
                                        width={100}
                                    />
                                    <p> Loading {currentDoc} </p>
                                </div>
                                :
                                <div id="doc-content" dangerouslySetInnerHTML={{ __html: render }} />
                        }




                    </div>
                )
            }
        </>
    )
}


export async function getServerSideProps(context) {
    let returns: any = { props: {} }

    let final = [];

    console.log(path.join(__dirname, '../../../../public/markdown'))

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

    returns.props.files = final;

    let MDFiles = {};

    let rds2 = fs.readdirSync(path.join(__dirname, '..', '..', '..', '..', 'public/markdown'));

    rds2.forEach(x => {
        if (fs.statSync(path.join(__dirname, '..', '..', '..', '..', 'public/markdown', x)).isDirectory()) {
            fs.readdirSync(path.join(__dirname, '..', '..', '..', '..', 'public/markdown', x)).forEach(i => {
                let d = fs.readFileSync(path.join(__dirname, '..', '..', '..', '..', 'public/markdown', x, i));
                if (!MDFiles[x]) MDFiles[x] = {}
                MDFiles[x][i] = d.toString();
            })

            return;
        }
        let d = fs.readFileSync(path.join(__dirname, '..', '..', '..', '..', 'public/markdown', x));
        MDFiles[x] = d.toString();
    })

    returns.props.md = MDFiles


    return returns;
}