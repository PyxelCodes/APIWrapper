

export function Header({ setInternalContent }) {



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
            </div>
        </div>
    )
}