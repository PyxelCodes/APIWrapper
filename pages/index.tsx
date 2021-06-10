import React from 'react'
import { Header } from '../components/Header'
import { DefineCorrespondingElement } from '../components/Main'
import { Footer } from '../components/Footer'
import { Formik } from 'formik'
import axios from 'axios';
import { useRouter } from 'next/router'
import { updateQueryStringParameter } from '../utils/updateQS'

export default function New() {

    if (process.browser) {
        let [internalContent, setInternalContentState] = React.useState('user')
        let [isChecking, setChecking] = React.useState(false)
        let [checkDidFail, fail] = React.useState(false)
        let [checkDidSucceed, done] = React.useState(false)

        const auth = window.localStorage.getItem('auth')


        let setInternalContent = (d) => {
            updateQueryStringParameter(window.location.href, 's', d);
            setInternalContentState(d);
        }

        if (!auth && !checkDidSucceed) {
            return (
                <>
                    <Header
                        setInternalContent={setInternalContent}
                    />

                    <div id="content">
                        <div id="auth-input">
                            <h2> Authentication </h2>
                            <p> We couldnt find your Authentication token anywhere, it seems to be lost </p>

                            <Formik
                                initialValues={{}}
                                onSubmit={(values: any, actions) => {
                                    let auth = values.auth;
                                    setChecking(true);
                                    axios.get('https://api.reefraid.com/v1/clans/debug', { headers: { Authorization: auth } })
                                        .then(() => {
                                            window.localStorage.setItem('auth', auth);
                                            done(true);
                                            fail(false);
                                            setChecking(false)
                                        })
                                        .catch(() => {
                                            fail(true);
                                            setChecking(false)
                                            actions.resetForm();
                                        })
                                }}
                            >

                                {
                                    props => (
                                        <form onSubmit={props.handleSubmit}>
                                            <input
                                                className={`form-control ${checkDidFail ? 'is-invalid' : ''}`}
                                                id="idinput"
                                                placeholder="Authentication Token"
                                                onChange={props.handleChange}
                                                type="text"
                                                name="auth"
                                                autoComplete="off"
                                            />

                                            {
                                                isChecking ? <p className="token-val"> validating token </p> : null
                                            }

                                            <input
                                                type="submit"
                                                id="submit"
                                                value="Select"
                                            />
                                        </form>
                                    )
                                }

                            </Formik>
                        </div>
                    </div>

                    <Footer alignToBottom={true} />
                </>
            )
        }

        let router = useRouter();

        let q = router.query


        return (
            <>
                <Header
                    setInternalContent={setInternalContent}
                />

                <DefineCorrespondingElement ic={internalContent} query={q?.s} prefetch={router.query?.prefetch}/>


                <Footer alignToBottom={false} />
            </>
        )
    } else return null;

}