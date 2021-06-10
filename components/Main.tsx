import { Clan } from './Clan'
import { User } from './User'
import { Item } from './Item'

export function DefineCorrespondingElement({ ic, query, prefetch: pf }) {


    const urlParams = new URLSearchParams(window.location.search);
    const s = urlParams.get('s');


    

    if (query) ic = query;

    if(s) ic = s;

    switch (ic) {
        case 'user':
            return <User prefetch={pf} />
        case 'clan':
            return <Clan prefetch={pf} />
        case 'item':
            return <Item prefetch={pf} />
        default:
            return <User prefetch={pf} />
    }
}