import { Searchbar } from './Searchbar'

const Header = (props: any) => {
    return (
        <div id="header">
            <div className="sidebar-top">
                <h3> Stats </h3>
            </div>
            <Searchbar {...props}/>
        </div>
    )
}

export {
    Header
};
