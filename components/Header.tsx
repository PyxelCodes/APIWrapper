import SettingsIcon from '@material-ui/icons/Settings';
import { useState } from 'react';
import { CSSTransition } from 'react-transition-group'
import { browserName, browserVersion } from 'react-device-detect'
import { updateQueryStringParameter } from '../utils/updateQS'

export function Header({ setInternalContent }) {

    const [open, setOpen] = useState(false);

    const [activeMenu, setActiveMenu] = useState('main');
    const [menuHeight, setMenuHeight] = useState(null);

    function calcHeight(el: any) {
        let height = el.offsetHeight;
        setMenuHeight(height + 40)
    }


    function DropdownItem(props) {
        return (
            <a href="#" className="menu-item" onClick={(x) => { props.goToMenu && setActiveMenu(props.goToMenu); if (props.onClick) props.onClick(x) }}>
                {
                    props.children
                }
            </a>
        )
    }

    return (
        <div id="header">
            <div id="header-container">
                <a href="https://stats.reefraid.com/">
                    <img
                        loading="lazy"
                        src="https://reefraid.com/wp-content/uploads/2020/08/cropped-Full-Width-e1619733508776.png"
                        alt=""
                        height="auto"
                        width="auto"
                        className="__header_img"
                    />
                </a>

                <span className="header-right">
                    <p onClick={() => setInternalContent('user')}>
                        User
                </p>
                    <p onClick={() => setInternalContent('clan')}>
                        Clans
                </p>
                    <p onClick={() => setInternalContent('item')}>
                        Items
                </p>
                </span>

                <span id="menu">
                    <li className="nav-item">
                        <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
                            <SettingsIcon />
                        </a>

                        {
                            open
                                ?
                                <div className="dropdown" style={{ height: menuHeight }}>
                                    <CSSTransition
                                        in={activeMenu === 'main'}
                                        unmountOnExit
                                        timeout={500}
                                        classNames={'menu-primary'}
                                        onEnter={calcHeight}
                                    >
                                        <div className="menu">
                                            <DropdownItem goToMenu="api"> API </DropdownItem>
                                            <DropdownItem goToMenu="auth"> Auth </DropdownItem>
                                            <DropdownItem onClick={() => { location.href = 'https://apiwrapper.vercel.app/docs/intro' }}> Documentation </DropdownItem>
                                            <DropdownItem> Version: 0.1.2 </DropdownItem>
                                        </div>
                                    </CSSTransition>

                                    <CSSTransition
                                        in={activeMenu === 'api'}
                                        unmountOnExit
                                        timeout={500}
                                        classNames={'menu-secondary'}
                                        onEnter={calcHeight}
                                    >
                                        <div className="menu">
                                            <DropdownItem> host: api.reefraid.com </DropdownItem>
                                            <DropdownItem> API Version: v1 </DropdownItem>
                                            <DropdownItem> engine: axios, XMLHTTPRequest </DropdownItem>
                                            <DropdownItem> user: {browserName} {browserVersion} </DropdownItem>
                                            <DropdownItem goToMenu="main"> Back </DropdownItem>
                                        </div>
                                    </CSSTransition>

                                    <CSSTransition
                                        in={activeMenu === 'auth'}
                                        unmountOnExit
                                        timeout={500}
                                        classNames={'menu-secondary'}
                                        onEnter={calcHeight}
                                    >
                                        <div className="menu">
                                            <DropdownItem> storage: window.localStorage </DropdownItem>
                                            <DropdownItem> Change Token (soon):tm: </DropdownItem>
                                            <DropdownItem goToMenu="main"> Back </DropdownItem>
                                        </div>
                                    </CSSTransition>
                                </div>
                                : null
                        }
                    </li>
                </span>
            </div>
        </div>
    )
}