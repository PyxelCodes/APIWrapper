import { Clan } from './Clan'
import { User } from './User'
import { Item } from './Item'

export function DefineCorrespondingElement({ ic }) {



    switch (ic) {
        case 'user':
            return <User />
        case 'clan':
            return <Clan />
        case 'item':
            return <Item />
        default:
            return <User />
    }
}