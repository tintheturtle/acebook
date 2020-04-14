import React from 'react'

import './Posts.css'

const EventPost = ({data}) => {
    return (
        <div className="profilepic-container" style={{alignContent: 'center '}}>
            <div className="event-image-container">
                <img 
                    src={data.imagePath} 
                    alt="profile"
                    className="event-image"
                />
            </div>
            <span className="grey-text">{data.timestamp}</span>
            <div className="post-info">
                {data.uploader} has created an event
            </div>
        </div>
    )
}

export default EventPost