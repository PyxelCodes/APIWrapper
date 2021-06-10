import React from 'react'
import { getEndpoint } from '../get'

export function Item ({ prefetch }) {

    let [isPreFetching, setIsPreFetching] = React.useState(false)

    let [didPrefetch, setDidPrefetch] = React.useState(false)

    let [item, setItem] = React.useState({})

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
    


    return null;
}