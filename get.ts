import axios from 'axios';
import { updateQueryStringParameter } from './utils/updateQS'

export const getEndpoint = (val, auth, cb, type) => {
    // there are only GET endpoints available to the normal user

    console.log('making request')

    axios.get(`https://api.reefraid.com/v1/${type}/${val}`, {
        headers: {
            Authorization: auth,
        }
    })
        .then(d => {
            updateQueryStringParameter(window.location.href, 'prefetch', d.data.itemId ? d.data.itemId : d.data._id)
            return cb('success', { data: d.data, status: d.status, statusText: d.statusText })
        })
        .catch(d => {
            if (d.response) return cb('fail', { data: d.response.data, status: d.response.status, statusText: d.response.statusText })

            return cb('fail', { data: { _error: 'internal error, could not make request', code: 0 }, status: '500', statusText: 'Internal Server Error' })
        })
}
