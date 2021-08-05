import React from 'react'
import { useHistory } from 'react-router-dom';

const CurrentView = () => {
    const history = useHistory();

    let pathname = history.location.pathname.split('/').map(x => x.charAt(0).toUpperCase() + x.slice(1)).join(' / ')

    let str = `Home ${pathname}`

    return (
        <div 
        className="currentview"
        style={{
            userSelect: 'none'
        }}
        >

            {str}
        </div>
    )
}

export {
    CurrentView
};
