import { Formik } from 'formik'
import React from 'react'
import { getEndpoint } from '../get'
import { DropdownItem } from "./dropdown";
import { ClanMemberMap } from './ClanMemberMap'

export function Clan({ prefetch }) {


    let auth = window.localStorage.getItem('auth')

    let [clan, setClan] = React.useState({
        _id: 'debug',
        xp: 305,
        ownerID: "477095216327950347",
        "members": [
            {
                "xp": 305,
                "role": null,
                "_id": "477095216327950347"
            }
        ],
        created: '2021-06-04T10:43:04.489Z'
    })

    let [isPreFetching, setIsPreFetching] = React.useState(false)

    let [didPrefetch, setDidPrefetch] = React.useState(false)


    React.useEffect(() => {
        if (!prefetch || didPrefetch) return;
        setIsPreFetching(true)
        setDidPrefetch(true)
        getEndpoint(prefetch, auth, (status, res) => {
            if (status === 'fail') {
                setDidPrefetch(true)
                setStat(true)
                setIsPreFetching(false)

            } else {
                setDidPrefetch(true)
                setClan(res.data)
                setStat(false)
                setIsPreFetching(false)

            }
        }, 'clans')
    })


    let [stat, setStat] = React.useState(false)


    return (
        <div id="content">

            <h2> Clan </h2>

            <p> Paste in the clan id of the clan you want to fetch</p>

            <Formik
                initialValues={{}}

                onSubmit={
                    (values: any, actions) => {
                        getEndpoint(values.userid, auth, (status, res) => {
                            if (status === 'fail') {
                                setStat(true)
                            } else {
                                setClan(res.data)
                                setStat(false)
                            }
                        }, 'clans')
                    }
                }
            >
                {
                    props => (
                        <form onSubmit={props.handleSubmit}>
                            <input
                                type="text"
                                onChange={props.handleChange}
                                name="userid"
                                placeholder="Clan ID"
                                className={`form-control ${stat ? 'is-invalid' : ''}`}
                                autoComplete="off"
                                id="idinput"
                            />

                            <input
                                type="submit"
                                value="Lookup"
                                id="submit"
                            />
                        </form>
                    )
                }
            </Formik>
            <br />
            <br />
            <div id="user">
                <h2 className="user_id">
                    {
                        clan._id
                    }
                </h2>
                {
                    Object.keys(clan).map(x => {

                        if (x === 'members') return <ClanMemberMap ml={x} clan={clan} />
                        let u = clan[x];

                        let color = typeof u === 'string' ? '#d37b4c' : '#7765c2';

                        if (u === null) u = 'null'
                        if (u === undefined) u = 'undefined'

                        if (x === '_id' || x === '__v' || x === 'invites') return null;

                        if (typeof u === 'object') {
                            return <DropdownItem extended={true} theme="dark" id="user-object" title={x}>
                                <div className="object-map">
                                    {
                                        Object.keys(u).length >= 1
                                            ?
                                            Object.keys(u).map(k => {
                                                let color = typeof u === 'number' ? '#7765c2' : '#d37b4c';
                                                return <span className="user-object-prop">
                                                    <p className="property inner">
                                                        {
                                                            JSON.stringify(k).replace('"', '').replace('"', '')
                                                        }
                                                    </p>
                                                    <p className="value" style={{ color }}>
                                                        {
                                                            JSON.stringify(u[k])
                                                        }
                                                    </p>
                                                </span>
                                            })
                                            : <span></span>
                                    }
                                </div>
                            </DropdownItem>
                        }
                        //if(u === null || u === undefined) u = 'null'
                        return (
                            <span className="user-property">
                                <p className="property">
                                    {
                                        String(x)
                                    }
                                </p>
                                <p className="value" style={{ color }}>
                                    {
                                        String(u)
                                    }
                                </p>
                                <br />
                                <br />
                            </span>
                        )
                    })
                }
            </div>
        </div>
    )
}