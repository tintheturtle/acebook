import React from 'react'

import './Posts.css'

const EventPost = ({data}) => {
    return (
        <div className="profilepic-container" >
            <div className="post-type" style={{background: '#FF3333'}}>
                BUVSA Event
            </div>
            <div className="profilepic-content" style={{alignContent: 'center '}}>
                <div>
                    <img 
                        className="event-image"
                        src={data.imagePath} 
                        alt="eventPicture" 
                    />
                </div>
                <span className="grey-text">{data.timestamp}</span>
                <div className="post-info">
                    <b>{data.name}</b> has created an event!
                </div>
            </div>
        </div>
    )
}

export default EventPost