import React from "react";

interface RRLogoInterface {
    width: number;
    height: number;
}

export const RRLogo: React.FC<RRLogoInterface> = ({ width, height}) => {
    return (
        <img
        src="/assets/reefraidlogo.png"
        alt="logo"
        style={{
            width,
            height,
            objectFit: 'cover'
        }}
    />
    )
}


