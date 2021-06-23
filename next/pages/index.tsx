import React from 'react'
import { Header } from '../components/page/Header'
import { DefineCorrespondingElement } from '../components/internal/Main'
import { Footer } from '../components/page/Footer'
import { Formik } from 'formik'
import axios from 'axios';
import { useRouter } from 'next/router'
import { updateQueryStringParameter } from '../utils/updateQS'
import Loader from 'react-loader-spinner'

declare global {
    interface Window {
        auth: any
    }
}

export default function New() {

    if (process.browser) {
        let [internalContent, setInternalContentState] = React.useState('user')
        let [loading, setLoading] = React.useState(true);
        let [auth, setAuth] = React.useState<any>(null)

        React.useEffect(() => {
            axios.get(process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api/v1/auth' : 'https://stats.reefraid.com/api/v1/auth', { withCredentials: true })
                .then(({ data }) => {
                    window.auth = data;
                    setAuth(data);
                    setLoading(false);
                })
                .catch(() => {
                    window.location.href = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api/v1/auth/discord' : 'https://stats.reefraid.com/api/v1/auth/discord'
                })
        }, [])


        let setInternalContent = (d) => {
            updateQueryStringParameter(window.location.href, 's', d);
            let url = new URL(window.location.href)
            let x = new URLSearchParams(url.search)
            x.delete('prefetch')
            window.history.replaceState(null, null, `${url.origin}${url.pathname}?${x.toString()}`);
            setInternalContentState(d);
        }



        let router = useRouter();

        let q = router.query

        if (loading) return (
            <>
                <Header
                    setInternalContent={setInternalContent}
                />

                <div
                id="loader"
                >

                    <Loader
                        type="Triangle"
                        color="#7765c2"
                        width="100"
                        height="100"
                    />
                </div>

                <Footer alignToBottom={true} />
            </>
        )

        return !loading && (
            <>
                <Header
                    setInternalContent={setInternalContent}
                />

                <DefineCorrespondingElement ic={internalContent} query={q?.s} prefetch={router.query?.prefetch} auth={auth} />


                <Footer alignToBottom={false} />
            </>
        )
    } else return null;

}