import React from 'react'

import FirstEvent from '../../images/generalMeeting.png'
import '../../styles/Event.css'

const data = {
    image: FirstEvent,
    title: 'General Meeting',
    time: 'Time',
    description: 'Lorem ipsum sum oil soaked chili.'
}

const Event = () => {

    if (!data) {
        return (
            <div className="row">
                No upcoming events, check out our <a href="https://www.facebook.com/buvsa/">Facebook</a> page to stay connected with BUVSA! 
            </div>
        )
    }
    return (
        <div className="event-container">
            <div className="event-image-container">
                <img 
                    className="event-image"
                    src={data.image} 
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