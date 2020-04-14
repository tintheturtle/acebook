import React from 'react'

import '../../styles/Event.css'

const Event = ({data}) => {
    return (
        <div className="event-container">
            <div className="event-image-container">
                <img 
                    className="event-image"
                    src={data.banner} 
                    alt="eventPicture" 
                />
            </div>
            <div className="event-content">
                <p className="event-title">
                    <b>Event: </b>{data.title}
                </p>
                <p className="event-title">
                    <b>Time: </b>{data.title}
                </p>
                <p className="event-desc">
                    <b>Description: </b>{data.description}
                </p>                   
            </div>
        </div>
    )
}

export default Event