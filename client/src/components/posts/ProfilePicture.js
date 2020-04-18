import React from 'react'

import './Posts.css'

const ProfilePicture = ({data}) => {
    return (
        <div className="profilepic-container" >
            <div className="post-type" style={{background: '#9966FF'}}>
                Profile Picture Changed
            </div>
            <div className="profilepic-content" style={{alignContent: 'center '}}>
                <div>
                    <img 
                        src={data.imagePath} 
                        alt="profile"
                        className="match-image"
                    />
                </div>
                <span className="grey-text">{data.timestamp}</span>
                <div className="post-info">
                    <b>{data.name}</b> has updated their profile picture
                </div>
            </div>
        </div>
    )
}

export default ProfilePicture