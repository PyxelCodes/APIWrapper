import { Formik } from 'formik'
import React from 'react'
import { getEndpoint } from '../get'


export function User() {

    let auth = window.localStorage.getItem('auth')

    let [user, setUser] = React.useState({
        _id: '477095216327950347',
        gold: 69420,
        vault: 69,
        vaultLvl: 100,
        defense: 1090,
        attack: 1090,
        joined: 1420070400000,
        farmLvl: 8,
        coinBoost: 1,
        commandsExecuted: 6969,

    })

    let [stat, setStat] = React.useState(false)


    return (
        <div id="content">

            <h2> User </h2>

            <p> Paste in the ID of the user you want to fetch</p>

            <Formik
                initialValues={{}}

                onSubmit={
                    (values: any, actions) => {
                        console.log(values)
                        getEndpoint(values.userid, auth, (status, res) => {
                            console.log(status, stat, res.data)
                            if(status === 'fail') {
                                setStat(true)
                            } else {
                                setUser(res.data)
                                setStat(false)
                            }
                        }, 'users')
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
                        user._id
                    }
                </h2>
                {
                    Object.keys(user).map(x => {
                        let u = user[x];

                        console.log(u, x)

                        if(u === null) u = 'null'
                        if(u === undefined) u = 'undefined'

                        if (x === '_id' || x === '__v') return null;

                        if (typeof u === 'object') {
                            return //Object.keys(u ?? {}).map(c => { return <span className="user-property"> {x}: {u}<br /> <br /> </span> }) 
                        }
                        //if(u === null || u === undefined) u = 'null'
                        return (
                            <span className="user-property">
                                { x}: { String(u) }
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