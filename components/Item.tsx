import React from 'react'
import { getEndpoint } from '../get'
import Loader from 'react-loader-spinner'
import { Formik } from 'formik'
import { DropdownItem } from './dropdown'

export function Item({ prefetch }) {

    let [isPreFetching, setIsPreFetching] = React.useState(false)

    let [didPrefetch, setDidPrefetch] = React.useState(false)

    let [item, setItem] = React.useState<any>({})

    const auth = window.localStorage.getItem('auth')

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
                setItem(res.data)
                setStat(false)
                setIsPreFetching(false)

            }
        }, 'items')
    })

    let [stat, setStat] = React.useState(false)



    return (
        <div id="content">

            {
                isPreFetching
                    ?
                    <>
                        <Loader
                            type="Triangle"
                            color="#7765c2"
                            width="100"
                            height="100"
                        />
                        <h2> Prefetching item {prefetch} </h2>
                    </>
                    :

                    <>
                        <h2> User </h2>

                        <p> Paste in the ID of the item you want to fetch</p>

                        <Formik
                            initialValues={{}}

                            onSubmit={
                                (values: any, actions) => {
                                    getEndpoint(values.userid, auth, (status, res) => {
                                        if (status === 'fail') {
                                            setStat(true)
                                        } else {
                                            setItem(res.data)
                                            setStat(false)
                                        }
                                    }, 'items')
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
                                            placeholder="User ID"
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
                                    item.itemId
                                }
                            </h2>
                            {
                                Object.keys(item).map(x => {
                                    let u = item[x];

                                    let color = typeof u === 'string' ? '#d37b4c' : '#7765c2';

                                    if (u === null) u = 'null'
                                    if (u === undefined) u = 'undefined'

                                    if (x === '_id' || x === '__v' || x === 'invites') return null;

                                    if(x === 'description') return (
                                        <span className="item-desc">
                                            {
                                                String(u)
                                            }
                                            <br />
                                            <br />
                                        </span>
                                    )

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
                                                        : <> </>
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
                    </>
            }
        </div>
    )
}