import React from 'react'

import './Posts.css'

const SpotlightPost = ({data}) => {
    return (
        <div className="profilepic-container" style={{alignContent: 'center '}}>
            <div>
                <img 
                    src={data.imagePath} 
                    alt="profile"
                    className="match-image"
                />
            </div>
            <span className="grey-text">{data.timestamp}</span>
            <div className="post-info">
                <b>{data.name}</b> is on the spotlight for {data.information}, go check out the latest spotlight post!
            </div>
        </div>
    )
}

export default SpotlightPost