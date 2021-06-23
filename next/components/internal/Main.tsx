import { Clan } from './Clan'
import { User } from './User'
import { Item } from './Item'

export function DefineCorrespondingElement({ ic, query, prefetch: pf, auth }) {


    const urlParams = new URLSearchParams(window.location.search);
    const s = urlParams.get('s');


    console.log(auth)



    if (query) ic = query;

    if (s) ic = s;

    if (!pf && ic === 'user') pf = auth.user.discordId;
    if (!pf && ic === 'clan') pf = auth.userData.clan;

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