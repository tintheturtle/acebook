import React from 'react'

import '../styles/Spotlight.css'

const Spotlight = ({data}) => {

    return (
        <div className="spotlight-container">
            <div className="spotlight-image-container">
                <img src={data.picture} 
                    className="match-image spotlight-image" 
                    alt="profile" />
            </div>
            <div className="spotlight-content">
                <p className="spotlight-title">
                    <b>Name: </b>{data.name}
                </p>
                <p className="spotlight-title">
                    <b>Major: </b>{data.major}
                </p>
                <p className="spotlight-desc">
                    <b>Description: </b>{data.description}
                </p>                   
            </div>
        </div>
    )
}

export default Spotlight