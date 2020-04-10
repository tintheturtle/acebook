import React from 'react'

import '../styles/Spotlight.css'

const Spotlight = ({data}) => {

    if (!data) {
        return (
            <div className="row">
                Not available at the moment, check out our <a href="https://www.facebook.com/buvsa/">Facebook</a> page to stay connected with BUVSA! 
            </div>
        )
    }
    return (
        <div className="spotlight-container">
            <div className="spotlight-image-container">
                <img src={data.image} 
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